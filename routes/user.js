const express = require('express');

const userController = require('../controllers/userController');

const { authCheck } = require('../middlewares/auth');

const router = express.Router();

//router.get('/user', )

router.post('/user/cart', authCheck, userController.userCart);
router.get('/user/cart', authCheck, userController.getUserCart);
router.delete('/user/cart', authCheck, userController.emptyCart);
router.post('/user/address', authCheck, userController.saveAddress);

//coupon
router.post('/user/cart/coupon', authCheck, userController.applyCouponToUserCart);

router.post('/user/order', authCheck, userController.createOrder);
router.get('/user/orders', authCheck, userController.orders);

router.post('/user/wishlist', authCheck, userController.addToWishList);
router.get('/user/wishlist', authCheck, userController.wishlist);
router.put('/user/wishlist/:productId', authCheck, userController.removeFromWishlist);

module.exports = router;