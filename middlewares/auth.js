const admin = require('../firebase');
const User = require('../models/user');

exports.authCheck = async(req, res, next) => {
    try {
        const firebaseUser = await admin.auth().verifyIdToken(req.headers.authtoken);
        req.user = firebaseUser;
        next();
    } catch (err) {
        res.status(401).json({
            error: err
        })
    }
    
}

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;

    const adminUser = await User.findOne({ email });

    if (adminUser.role !== 'admin') {
        res.status(403).json({ error: 'Admin resource. Access denied.' })
    } else {
        next();
    }
};
