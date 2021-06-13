import React from "react";
import { Button, Input, Select, Divider } from "antd";

const { Option } = Select;

const ProductCreateForm = ({
  setValue,
  handleSubmit,
  handleChange,
  values,
  handleCategoryChange,
  subOptions
}) => {
  const {
    title,
    description,
    category,
    subs,
    shipping,
    color,
    colors,
    brand,
    categories,
    images,
    quantity,
    price,
    brands,
  } = values;

  return (
    <form onSubmit={handleSubmit} style={{ marginRight: "2rem" }}>
      <>
        <label htmlFor="title">Title</label>
        <br />
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          size="large"
          style={{ maxWidth: 750 }}
        />
      </>
      <Divider />
      <>
        <label htmlFor="description">Description</label>
        <br />
        <Input
          type="text"
          id="description"
          name="description"
          value={description}
          onChange={handleChange}
          size="large"
          style={{ maxWidth: 750 }}
        />
      </>
      <Divider />
      <>
        <label htmlFor="price">Price</label>
        <br />
        <Input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={handleChange}
          size="large"
          style={{ maxWidth: 750 }}
        />
      </>
      <Divider />
      <>
        <label>Shipping</label>
        <br />
        <Select
          style={{ width: "100%" }}
          placeholder="select"
          name="shipping"
          onChange={(val) => setValue({ ...values, shipping: val })}
        >
          <Option value="Yes">Yes</Option>
          <Option value="No">No</Option>
        </Select>
      </>
      <Divider />
      <>
        <label htmlFor="quantity">Quantity</label>
        <br />
        <Input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleChange}
          size="large"
          style={{ maxWidth: 750 }}
        />
      </>
      <Divider />
      <>
        <label>Color</label>
        <br />
        <Select
          style={{ width: "100%" }}
          placeholder="select color"
          name="color"
          onChange={(val) => setValue({ ...values, color: val })}
        >
          {colors.map((color, index) => (
            <Option key={index} value={color}>
              {color}
            </Option>
          ))}
        </Select>
      </>
      <Divider />
      <>
        <label>Brand</label>
        <br />
        <Select
          style={{ width: "100%" }}
          placeholder="select brand"
          name="brand"
          onChange={(val) => setValue({ ...values, brand: val })}
        >
          {brands.map((brand, index) => (
            <Option key={index} value={brand}>
              {brand}
            </Option>
          ))}
        </Select>
      </>
      <Divider />
      <label>Category</label>
      <br />
      <Select
        placeholder="Please Select"
        onChange={handleCategoryChange}
        size="middle"
        style={{ width: "100%" }}
      >
        {categories.length > 0 &&
          categories.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.name}
            </Option>
          ))}
      </Select>
      <Divider/>
      {category && (
            <>
              <label>Sub Categories</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="please select"
                value={subs}
                onChange={val => setValue({ ...values, subs: val })}
              >
                {subOptions.length && subOptions.map(sub => (
                  <Option key={sub._id} value={sub._id}>{sub.name}</Option>
                ))}
              </Select>
            </>
      )}
      <br />
      <br />
      <Button type="primary" htmlType="submit" block>
        Save
      </Button>
    </form>
  );
};

export default ProductCreateForm;
