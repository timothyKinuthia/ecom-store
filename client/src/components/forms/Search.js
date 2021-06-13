import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const history = useHistory();
  
  const { text } = search;

  const handleChange = (evt) => {
      dispatch({
          type: 'SEARCH_QUERY',
          payload: { text: evt.target.value }
      });
  };

  const handleSubmit = (evt) => {
      evt.preventDefault();
      history.push(`/shop?${text}`);
  };
  
  return (
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="search"
        onChange={handleChange}
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
