import React from 'react';
import { Button } from "antd";

const CategoryForm = ({handleSubmit, setName, name, loading}) => (
    <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label>Name</label>
      <input
        type="text"
        className="form-control"
        value={name}
        onChange={(evt) => setName(evt.target.value)}
        autoFocus
        required
      />
      <br />
      {/* <button type="submit">Submit</button> */}
      <Button
        htmlType="submit"
        type="dashed"
        disabled={loading || !name}
        block
      >
        Save
      </Button>
    </div>
  </form>
)

export default CategoryForm
