import axios from 'axios';

export const getCategories = async () => await axios.get('http://localhost:5000/api/categories');

export const getCategory = async (slug, authtoken) => await axios.get(`http://localhost:5000/api/category/${slug}`, {
    headers: {
        authtoken

    }
});

export const removeCategory = async (slug, authtoken) => await axios.delete(`http://localhost:5000/api/category/${slug}`, {
    headers: {
        authtoken
    }
});

export const createCategory = async (category, authtoken) => await axios.post('http://localhost:5000/api/category', category, {
    headers: {
        authtoken
    }
});

export const updateCategory = async (slug, data, authtoken) => await axios.put(`http://localhost:5000/api/category/${slug}`, data,  {
    headers: {
        authtoken
    }
});

export const getCategorySubs = async (_id) => await axios.get(`http://localhost:5000/api/category/subs/${_id}`);