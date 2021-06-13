import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  getCategory,
  updateCategory
} from "../../../functions/category";
import { Spin } from "antd";
import CategoryForm from "../../../components/forms/CategoryForm";

const CategoryUpdate = ({history, match}) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
      loadCategory();
  }, []);
    
  const loadCategory = () => {
      getCategory(match.params.slug, user.token).then(res => {
          setName(res.data.category.name);
      }).catch(err => {
        console.log(err)
      })
  }

//   const loadCategories = () => {
//     return getCategories().then((res) => setCategories(res.data));
//   };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    updateCategory(match.params.slug, { name }, user.token)
        .then((res) => {
        setLoading(false);
          setName(res.data.category.name);
          loadCategory();
          toast.success(`${name} is created`);
          history.push('/admin/category')
      })
      .catch((err) => {
        console.log(err.response);
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="colmd-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? <Spin size="default" /> : <h4>Update Category</h4>}
          <CategoryForm name={name} handleSubmit={handleSubmit} setName={setName} loading={loading}/>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;

