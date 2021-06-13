const Sub = require('../models/sub');
const Product = require('../models/product');
const slugify = require('slugify');


exports.create = async(req, res, next) => {
    try {
        const { name, parent } = req.body;

        const sub = await Sub.create({ name, parent, slug: slugify(name) });

        res.status(200).json({
            status: 'success',
            sub
        })
    } catch (err) {
        res.status(400).json({
            error: err.message
        })
    }

}
exports.list = async (req, res, next) => {
    res.status(200).json(await Sub.find({}).sort({createdAt: -1}))
    
}
exports.read = async (req, res, next) => {
    try {
        const sub = await Sub.findOne({ slug: req.params.slug });

        const products = await Product.find({subs: sub}).populate('category')
        res.status(200).json({
            status: 'success',
            products,
            sub
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
exports.update = async (req, res, next) => {
    try {
        const sub = await Sub.findOneAndUpdate({ slug: req.params.slug }, {name: req.body.name, parent: req.body.parent, slug: slugify(req.body.name)}, {new: true});
        res.status(200).json({
            status: 'success',
            sub
        })
    } catch (err) {
        res.status(400).json({ error: err });
    }
}
exports.remove = async(req, res, next) => {
    try {
        await Sub.findOneAndDelete({ slug: req.params.slug })
    
        res.status(204).json({
            status: 'removed'
        })
    } catch (err) {
        res.status(400).json({error: err})
    }
}