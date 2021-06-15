const express = require('express');

//controllers
const authController = require('../controllers/authController');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();


router.post('/create', authCheck, authController.createOrUpdateUser);

router.post('/current-user', authCheck, authController.currentUser);

router.post('/current-admin', authCheck, adminCheck, authController.currentUser);

module.exports = router;