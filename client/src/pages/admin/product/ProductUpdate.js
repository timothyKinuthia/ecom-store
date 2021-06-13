import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Grid from "@material-ui/core/Grid";
import { Spin, Avatar, Badge } from "antd";
import { Divider, Typography } from "antd";
import AdminNav from "../../../components/nav/AdminNav";
import { createProduct, updateProduct } from "../../../functions/product";
import { getProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const { Title } = Typography;

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Sumsung", "Microsoft", "Lenovo", "Asus"],
  brand: "",
  color: "",
};

const ProductUpdate = ({ match, history }) => {
  const [values, setValue] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
  const [categoryValue, setCategoryValue] = useState('');
  const [loading, setLoading] = useState(false)

  const { user } = useSelector((state) => ({ ...state }));

  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setValue({ ...values, ...res.data.product });
        getCategorySubs(res.data.product.category._id).then((res) => {
          setSubOptions(res.data.subs);
          const arr = [];
          res.data.subs.map((s) => arr.push(s._id));
          setArrayOfSubIds((prev) => arr);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);

    updateProduct(slug, values, user.token).then(res => {
      setLoading(false);
      toast.success(`${res.data.product.title} is updated`);
      history.push('/admin/products')
    }).catch(err => {
      setLoading(false)
      console.log(err);
      toast.error(err.response.data.error.message)
    })

    values.sub = arrayOfSubIds;
    values.category = categoryValue ? categoryValue : values.category
  };

  const handleChange = (evt) => {
    setValue({ ...values, [evt.target.name]: evt.target.value });
  };

  const handleCategoryChange = (val) => {
    setValue({ ...values, subs: [] });

    setCategoryValue(val);
    
    getCategorySubs(val)
      .then((res) => {
        setSubOptions(res.data.subs);
      })
      .catch((err) => {
        console.log(err);
      });
    if (values.category._id === val) {
      loadProduct();
    }
    
    setArrayOfSubIds([]);
    
  };

  const handleRemove = (id) => {
    setLoading(true);
    axios
      .post(
        "http://localhost:5000/api/removeimage",
        { public_id: id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        setLoading(false);
        const { images } = values;
        const filteredImages = images.filter((img) => img.public_id !== id);
        setValue({ ...values, images: filteredImages });
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.resonse.data.error);
      });
  };

  return (
    <Grid container>
      <Grid item sm={2} xs={12}>
        <AdminNav />
      </Grid>
      <Grid item sm={10} xs={12}>
        <Title style={{ color: "teal" }} level={4}>
          Update Product
        </Title>
        {values.images.length > 0 &&
          values.images.map((img) => (
            <Badge
              count="X"
              key={img.public_id}
              onClick={() => handleRemove(img.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={img.url}
                size={60}
                shape="square"
                style={{ marginLeft: "1rem" }}
              />
            </Badge>
          ))}
        <div className="p-3">
        <FileUpload
            values={values}
            setValue={setValue}
            loading={loading}
            setLoading={setLoading}
          />
        </div>
        <br/>
        <div className="p-3">
          <ProductUpdateForm
            values={values}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            setValue={setValue}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            categories={categories}
            arrayOfSubIds={arrayOfSubIds}
            setArrayOfSubIds={setArrayOfSubIds}
            categoryValue={categoryValue}
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default ProductUpdate;
