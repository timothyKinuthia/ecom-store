const express = require('express');
const stripeController = require('../controllers/stripeController');
const { authCheck } = require('../middlewares/auth');

const router = express.Router();


router.post('/create-payment-intent', authCheck, stripeController.createPaymentIntent);

module.exports = router;