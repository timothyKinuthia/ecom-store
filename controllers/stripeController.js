const User = require('../models/user');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Coupon = require('../models/coupon');
const stripe = require('stripe')(process.env.STRIPE_SECRET);


exports.createPaymentIntent = async (req, res, next) => {
    

    const { couponApplied } = req.body;
    //later apply coupon
    //later calculate price
    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderdBy: user._id });

    let finalValue = 0;

    if (couponApplied && cart.totalAfterDiscount) {
        finalValue = cart.totalAfterDiscount * 100
    } else {
        finalValue = cart.cartTotal * 100
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: finalValue,
        currency: 'usd'
    })

    res.json({
        clientSecret: paymentIntent.client_secret,
        cartTotal: cart.cartTotal,
        totalAfterDiscount: cart.totalAfterDiscount,
        payable: finalValue
    })
}