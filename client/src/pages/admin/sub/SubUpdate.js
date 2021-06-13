import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import AdminNav from '../../../components/nav/AdminNav';
import { Spin, Select } from "antd";
import { toast } from "react-toastify";
import {
  getSub,
  updateSub,
} from "../../../functions/sub.js";
import {getCategories} from '../../../functions/category';
import CategoryForm from "../../../components/forms/CategoryForm";

const { Option } = Select;

const SubUpdate = ({match, history}) => {

    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    //const [category, setCategory] = useState('');
    const [parent, setParent] = useState('');

  
  
    const { user } = useSelector((state) => ({ ...state }));
  
    useEffect(() => {
      loadCategories();
      loadSub();
        
    }, []);

  
    const loadCategories = () => {
      return getCategories().then((res) => setCategories(res.data))
    };

    const loadSub = () => {
      return getSub(match.params.slug, user.token).then((res) => {
          setName(res.data.sub.name);
          setParent(res.data.sub.parent)
        });
      };

    const handleChange = val => {
      setParent(val);
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
        setLoading(true);
    
        updateSub(match.params.slug, { name, parent }, user.token)
          .then((res) => {
            setLoading(false);
            loadCategories();
            toast.success(`${name} is updated`);
            setName("");
            history.push('/admin/sub')
          })
          .catch((err) => {
            console.log(err.response);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data.error);
          });
    };
    
    return (
        <>
            <Row>
                <Col>
                    <AdminNav/>
                </Col>
                <Col span={20} >
                    {loading ? <Spin size="default" /> : <h4>Update sub category</h4>}
                    <Select onChange={handleChange} size="middle" style={{ width: 180 }}>
                        {categories.length > 0 && categories.map(cat => (
                            <Option key={cat._id} value={cat._id} >{cat.name}</Option>
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
                </Col>
            </Row>  
        </>
    )
}

export default SubUpdate