import React, {useState, useEffect} from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import AdminNav from '../../../components/nav/AdminNav';
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { Spin, Select } from "antd";
import { toast } from "react-toastify";
import {
  createSub,
  removeSub,
  getSubs
} from "../../../functions/sub.js";
import {getCategories} from '../../../functions/category';
import CategoryForm from "../../../components/forms/CategoryForm";
import LocalSearch from "../../../components/forms/LocalSearch";

const { Option } = Select;

const SubCreate = () => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([]);
    const [category, setCategory] = useState('');
  
    //searching/filtering
    //step 1
    const [keyword, setKeyword] = useState("");
  
    const { user } = useSelector((state) => ({ ...state }));
  
    useEffect(() => {
        loadCategories();
        loadSubs();
    }, []);
  
    const loadCategories = () => {
      return getCategories().then((res) => setCategories(res.data));
    };

    const loadSubs = () => {
        return getSubs().then((res) => setSubs(res.data));
      };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    
        createSub({ name, parent: category }, user.token)
          .then((res) => {
            setLoading(false);
            setName("");
            loadCategories();
            toast.success(`${name} is created`);
            loadSubs();
          })
          .catch((err) => {
            console.log(err.response);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data.error);
          });
    };

    const handleChange = val => {
        setCategory(val)
    }
    
    const handleRemove = (slug) => {
        if (window.confirm("Delete")) {
          setLoading(true);
          removeSub(slug, user.token)
            .then((res) => {
              setLoading(false);
              toast.warning(`successfully deleted ${slug}`);
                loadSubs();
            })
            .catch((err) => {
              setLoading(false);
              if (err.response.status === 400) toast.error(err.response.data.error);
            });
        }
      };
    return (
        <>
            <Row>
                <Col>
                    <AdminNav/>
                </Col>
                <Col span={20} >
                    {loading ? <Spin size="default" /> : <h4>Create sub category</h4>}
                    <Select placeholder="Please Select" onChange={handleChange} size="middle" style={{ width: 180 }}>
                        {categories.length > 0 && categories.map(cat => (
                            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                        ))}
                    </Select>
                    <br />
                    <br/>
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
                    {subs.filter(sub => sub.name.toLowerCase().includes(keyword)).map((sub) => (
                    <div className="alert alert-primary" key={sub._id}>
                        {sub.name}{" "}
                        <span
                        onClick={() => handleRemove(sub.slug)}
                        className="btn btn-sm float-right"
                        >
                        <Tooltip title="Delete Category" color="orange">
                            <DeleteOutlined className="text-info" />
                        </Tooltip>
                        </span>
                        <Link to={`/admin/sub/${sub.slug}`}>
                        <span className="btn btn-sm float-right">
                            <Tooltip title="Edit Category" color="cyan">
                            <EditOutlined className="text-info" />
                            </Tooltip>
                        </span>
                        </Link>
                    </div>
                    ))}
                </Col>
            </Row>  
        </>
    )
}

export default SubCreate

