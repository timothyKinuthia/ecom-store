const Coupon = require('../models/coupon');



exports.create = async(req, res, next) => {
    try {
        const { name, expiry, discount } = req.body.coupon;
        res.json(await Coupon.create({ name, expiry, discount }));
    } catch (err) {
        console.log(err)
    }
}

exports.list = async(req, res, next) => {
    try {
        res.json(await Coupon.find({}).sort({createdAt: -1}));
    } catch (err) {
        console.log(err)
    }
}

exports.remove = async(req, res, next) => {
    try {
        res.json(await Coupon.findByIdAndDelete(req.params.couponId));
    } catch (err) {
        console.log(err)
    }
}