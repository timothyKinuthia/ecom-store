const Category = require('../models/category');
const Sub = require('../models/sub');
const Product = require('../models/product');
const slugify = require('slugify');


exports.create = async(req, res, next) => {
    try {
        const { name } = req.body;

        const category = await Category.create({ name, slug: slugify(name) });

        res.status(200).json({
            status: 'success',
            category
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}
exports.list = async (req, res, next) => {
    res.status(200).json(await Category.find({}).sort({createdAt: -1}))
    
}
exports.read = async (req, res, next) => {
    try {
        const category = await Category.findOne({ slug: req.params.slug });

        const products = await Product.find({ category }).populate('category')

        res.status(200).json({
            status: 'success',
            products,
            category
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
exports.update = async (req, res, next) => {
    try {
        const category = await Category.findOneAndUpdate({ slug: req.params.slug }, {name: req.body.name, slug: slugify(req.body.name)}, {new: true});
        res.status(200).json({
            status: 'success',
            category
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
exports.remove = async(req, res, next) => {
    try {
        await Category.findOneAndDelete({ slug: req.params.slug })
    
        res.status(204).json({
            status: null
        })
    } catch (err) {
        res.status(400).json({error: err})
    }
}

exports.getSubs = async(req, res, next) => {
    const subs = await Sub.find({ parent: req.params._id });
    res.status(200).json({
        status: 'success',
        subs
    })
}