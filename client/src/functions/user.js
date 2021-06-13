import axios from 'axios';

export const userCart = async (cart, authtoken) => await axios.post('http://localhost:5000/api/user/cart', { cart }, {
    headers: {
        authtoken
    }
});

export const getUserCart = async (authtoken) => await axios.get('http://localhost:5000/api/user/cart', {
    headers: {
        authtoken
    }
});

export const emptyUserCart = async (authtoken) => await axios.delete('http://localhost:5000/api/user/cart', {
    headers: {
        authtoken
    }
});

export const saveUserAddress = async (address, authtoken) => await axios.post('http://localhost:5000/api/user/address', { address }, {
    headers: {
        authtoken
    }
});

export const applyCoupon = async (coupon, authtoken) => await axios.post('http://localhost:5000/api/user/cart/coupon', { coupon }, {
    headers: {
        authtoken
    }
});

export const createOrder = async (stripeResponse, authtoken) => await axios.post('http://localhost:5000/api/user/order', { stripeResponse }, {
    headers: {
        authtoken
    }
});

export const getUserOrders = async (authtoken) => await axios.get('http://localhost:5000/api/user/orders', {
    headers: {
        authtoken
    }
});

export const getWishlist = async (authtoken) => await axios.get('http://localhost:5000/api/user/wishlist', {
    headers: {
        authtoken
    }
});

export const addWishlist = async (productId, authtoken) => await axios.post('http://localhost:5000/api/user/wishlist', { productId }, {
    headers: {
        authtoken
    }
});

export const removeWishlist = async (productId, authtoken) => await axios.put(`http://localhost:5000/api/user/wishlist/${productId}`, {}, {
    headers: {
        authtoken
    }
});