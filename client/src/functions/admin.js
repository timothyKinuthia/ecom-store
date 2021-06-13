import axios from 'axios';


export const getAllOrders = async (authtoken) => await axios.get('http://localhost:5000/api/admin/orders', {
    headers: {
        authtoken
    }
});

export const changeStatus = async (orderId, orderStatus, authtoken) => await axios.put('http://localhost:5000/api/admin/order-status', { orderId, orderStatus }, {
    headers: {
        authtoken
    }
})