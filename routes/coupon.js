const express = require('express');

//controllers
const couponController = require('../controllers/couponController');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/coupon', authCheck, adminCheck, couponController.create);
router.get('/coupon', couponController.list);
router.delete('/coupon/:couponId', authCheck, adminCheck, couponController.remove);



module.exports = router;