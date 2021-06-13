import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Spin } from "antd";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //searching/filtering
  //step 1
  const [keyword, setKeyword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    return getCategories().then((res) => setCategories(res.data));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        loadCategories();
        toast.success(`${name} is created`);
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.error);
      });
  };
  //step 3

  
  //step 4
// const searched = keyword => category => category.name.toLowerCase().includes(keyword);

  const handleRemove = (slug) => {
    if (window.confirm("Delete")) {
      setLoading(true);
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.warning(`successfully deleted ${slug}`);
          loadCategories();
        })
        .catch((err) => {
          setLoading(false);
          if (err.response.status === 400) toast.error(err.response.data.error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <Spin size="default" /> : <h4>Create category</h4>}
          <CategoryForm
            name={name}
            handleSubmit={handleSubmit}
            setName={setName}
            loading={loading}
          />
          {/* step 2 */}
          <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
          <br/>
          <br/>
          {categories.filter(category => category.name.toLowerCase().includes(keyword)).map((category) => (
            <div className="alert alert-primary" key={category._id}>
              {category.name}{" "}
              <span
                onClick={() => handleRemove(category.slug)}
                className="btn btn-sm float-right"
              >
                <Tooltip title="Delete Category" color="orange">
                  <DeleteOutlined className="text-info" />
                </Tooltip>
              </span>
              <Link to={`/admin/category/${category.slug}`}>
                <span className="btn btn-sm float-right">
                  <Tooltip title="Edit Category" color="cyan">
                    <EditOutlined className="text-info" />
                  </Tooltip>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
