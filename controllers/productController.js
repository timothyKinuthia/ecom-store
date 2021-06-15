const slugify = require("slugify");
const product = require("../models/product");
const Product = require("../models/product");
const User = require("../models/user");

exports.create = async (req, res, next) => {
  try {
    req.body.slug = slugify(req.body.title);

    const product = await Product.create(req.body);
    res.status(201).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

exports.listAll = async (req, res, next) => {
  try {
    const products = await Product.find({})
      .limit(req.params.count * 1)
      .populate("category")
      .populate("subs")
      .sort([["createdAt", "desc"]]);

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Product.findOneAndDelete({ slug: req.params.slug });

    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
};

exports.read = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subs");

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    res.status(200).json({
      status: "success",
      product,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
  }
};


//WITH PAGINATION
exports.list = async (req, res, next) => {
  try {
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .populate("category")
      .populate("subs")
      .skip((currentPage - 1) * perPage)
      .sort([[sort, order]])
      .limit(perPage);

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
};

exports.productsCount = async (req, res, next) => {
  const total = await Product.find({}).estimatedDocumentCount();

  res.status(200).json({
    status: "success",
    total,
  });
};

exports.productStar = async (req, res, next) => {
  //FIND PRODUCT FOR UPDATING
  const product = await Product.findById(req.params.productId);

  //FIND LOGGED IN USER
  const user = await User.findOne({ email: req.user.email });

  //DESTRUCTURE THE STAR YOU ARE RECEIVING FROM FRONTEND
  const { star } = req.body;

  //WHO IS UPDATING?
  //CHECK IF CURRENTLY LOGGED IN USER HAVE ALREADY ADDED RATING TO THIS PRODUCT?
  const existingRatingObject = product.ratings.find(
    (el) => el.postedBy.toString() === user._id.toString()
  );

  //IF USER HAVEN'T ADDED RATING YET, PUSH IT TO THE ARRAY
  if (!existingRatingObject) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      { $push: { ratings: { star, postedBy: user._id } } },
      { new: true }
    );

    res.json(ratingAdded);
  } else {
    //IF USER HAVE ALREADY LEFT RATING, UPDATE IT
    const ratingUpdated = await Product.updateOne(
      { ratings: { $elemMatch: existingRatingObject } },
      { $set: { "ratings.$.star": star } },
      { new: true }
    );
    res.json(ratingUpdated);
  }
};

exports.listRelated = async (req, res, next) => {
  const product = await Product.findById(req.params.productId);

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subs")
    .populate("postedBy");

  res.json(related);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name");

  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: { $gte: price[0], $lte: price[1] },
    })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name");
    
    res.json(products)
    
  } catch (err) {
    console.log(err);
  }
};

const handleCategory = async(req, res, category) => {
  try { 
    const products = await Product.find({ category })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name");
    
    res.json(products);
    
  } catch (err) {
      console.log(err)
  }
}

const handleStars = async (req, res, stars) => {
  try {
    const aggregate = await Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: { $avg: "$ratings.star" }
          }
        }
      },
      {
        $match: { floorAverage: stars }
      }
    ])
    .limit(12)
    
    const product = await Product.find({ _id: aggregate })
    .populate("category", "_id name")
    .populate("subs", "_id name")
    .populate("postedBy", "_id name");

    res.json(product);

  } catch (err) {
    console.log(err)
  }
}

const handleSub = async(req, res, sub) => {
  const products = await Product.find({ subs: sub })
  .populate("category", "_id name")
  .populate("subs", "_id name")
  .populate("postedBy", "_id name");
  
  res.json(products);
}

const handleShipping = async(req, res, shipping) => {
  const products = await Product.find({ shipping })
  .populate("category", "_id name")
  .populate("subs", "_id name")
  .populate("postedBy", "_id name");
  
  res.json(products);
}

const handleColor = async(req, res, color) => {
  const products = await Product.find({ color })
  .populate("category", "_id name")
  .populate("subs", "_id name")
  .populate("postedBy", "_id name");
  
  res.json(products);
}

const handleBrand = async(req, res, brand) => {
  const products = await Product.find({ brand })
  .populate("category", "_id name")
  .populate("subs", "_id name")
  .populate("postedBy", "_id name");
  
  res.json(products);
}

exports.filters = async (req, res, next) => {
  const { query, price, category, stars, sub, shipping, color, brand } = req.body;

  if (query) {
    console.log("QUERY", query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStars(req, res, stars);
  }

  if (sub) {
    await handleSub(req, res, sub);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }

  if (color) {
    await handleColor(req, res, color);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }
};
