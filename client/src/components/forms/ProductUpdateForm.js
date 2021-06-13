/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { Button, Input, Select, Divider } from "antd";

const { Option } = Select;

const ProductUpdateForm = ({
  setValue,
  handleSubmit,
  handleChange,
  handleCategoryChange,
  values,
  subOptions,
  categories,
  arrayOfSubIds,
  setArrayOfSubIds,
  categoryValue
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
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
          style={{ width: "100%" }}
        />
      </>
      <Divider />
      <>
        <label>Shipping</label>
        <br />
        <Select
          defaultValue={shipping}
          style={{ width: "100%" }}
          placeholder="select"
          defaultValue={shipping === 'Yes' ? 'Yes' : 'No'}
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
          style={{ width: "100%" }}
        />
      </>
      <Divider />
      <>
        <label>Color</label>
        <br />
        <Select
          style={{ width: "100%" }}
          value={color}
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
          value={brand}
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
        onChange={handleCategoryChange}
        size="middle"
        value={categoryValue ? categoryValue : category._id}
        style={{ width: "100%" }}
      >
        {categories.length > 0 &&
          categories.map((cat) => (
            <Option key={cat._id} value={cat._id} >
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
                value={arrayOfSubIds}
                placeholder="please select"
                onChange={val => setArrayOfSubIds(val)}
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

export default ProductUpdateForm;