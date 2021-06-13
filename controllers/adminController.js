const Order = require('../models/orders');


exports.orders = async(req, res, next) => {
    const allOrders = await Order.find({}).sort('-createdAt').populate('products.product');

    res.json(allOrders);
}

exports.orderStatus = async(req, res, next) => {
    const { orderId, orderStatus } = req.body;


    const updated = await Order.findByIdAndUpdate(orderId, { orderStatus }, { new: true });

    res.json(updated);
}