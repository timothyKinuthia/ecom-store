const express = require('express');

const adminController = require('../controllers/adminController');

const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.get('/admin/orders', authCheck, adminCheck, adminController.orders);

router.put('/admin/order-status', authCheck, adminCheck, adminController.orderStatus);

module.exports = router