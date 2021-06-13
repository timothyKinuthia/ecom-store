const User = require('../models/user');
const catchAsync = require('../utils/catchAsync');


exports.createOrUpdateUser = async(req, res) => {
    const { name, picture, email } = req.user;

    const user = await User.findOneAndUpdate({ email }, { name: email.split('@')[0], picture }, { new: true });
    
    if (user) {
        res.status(201).json({
            status: 'success',
            user
        })
    } else {
        const newUser = await User.create({
            name,
            email,
            picture
        })

        res.status(201).json({
            status: 'success',
            newUser
        })
    }

   
}

exports.currentUser = async(req, res, next) => {
    const user = await User.findOne({ email: req.user.email })

    if (!user) {
        res.status(404).json({error: 'user not found'})
    }
    
    res.status(200).json({
        status: 'success',
        user
    })

}