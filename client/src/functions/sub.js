import axios from 'axios';

export const getSubs = async () => await axios.get('http://localhost:5000/api/subs');

export const getSub = async (slug, authtoken) => await axios.get(`http://localhost:5000/api/sub/${slug}`, {
    headers: {
        authtoken

    }
});

export const removeSub = async (slug, authtoken) => await axios.delete(`http://localhost:5000/api/sub/${slug}`, {
    headers: {
        authtoken
    }
});

export const createSub = async (category, authtoken) => await axios.post('http://localhost:5000/api/sub', category, {
    headers: {
        authtoken
    }
});

export const updateSub = async (slug, data, authtoken) => await axios.put(`http://localhost:5000/api/sub/${slug}`, data,  {
    headers: {
        authtoken
    }
});