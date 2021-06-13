import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Divider, Typography } from "antd";
import { createProduct } from "../../../functions/product";
import Grid from "@material-ui/core/Grid";
//imports
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { Spin, Avatar, Badge } from "antd";

const { Title } = Typography;

const initialState = {
  title: "",
  description: "",
  price: "",
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Sumsung", "Microsoft", "Lenovo", "Asus", "HP", "Dell"],
  brand: "",
  color: "",
  categories: [],
};

const ProductCreate = () => {
  const [values, setValue] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => {
      setValue({ ...values, categories: res.data });
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    createProduct(values, user.token)
      .then((res) => {
        window.alert(`"${res.data.product.title}" is created`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error);
      });
  };

  const handleChange = (evt) => {
    setValue({ ...values, [evt.target.name]: evt.target.value });
  };

  const handleCategoryChange = (val) => {
    setValue({ ...values, subs: [], category: val });
    getCategorySubs(val)
      .then((res) => {
        setSubOptions(res.data.subs);
      })
      .catch();
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
        {/* <h4>Product Create</h4> */}
        <Title style={{ color: "teal" }} level={4}>
          Create Product
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
          <br />
        </div>
        <Divider />
        <ProductCreateForm
          setValue={setValue}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleCategoryChange={handleCategoryChange}
          values={values}
          subOptions={subOptions}
        />
      </Grid>
    </Grid>
  );
};

export default ProductCreate;
