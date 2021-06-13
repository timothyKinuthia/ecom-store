import React from 'react';
import { Input } from "antd";

const { Search } = Input;

const LocalSearch = ({setKeyword, keyword}) => {

    const handleSearchChange = evt => {
        evt.preventDefault()
        setKeyword(evt.target.value.toLowerCase())
    }

    return <Search placeholder="search category" size="middle" value={keyword} onChange={handleSearchChange} />
}

export default LocalSearch
