import axios from 'axios';


export const createPaymentIntent = async (authtoken, coupons) => axios.post('http://localhost:5000/api/create-payment-intent', {couponApplied: coupons}, {
    headers: {
        authtoken
    }
})