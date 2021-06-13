const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/orders");

exports.userCart = async (req, res, next) => {
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email });

  //check if cart with logged in user id already exists

  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id });

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price for creating total
    //we should get price from database rather than frontend to prevent user localstorage manipulation of price

    let productFromDB = await Product.findById(cart[i]._id).select("price");
    object.price = productFromDB.price;

    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count;
  }

  const newCart = await Cart.create({
    products,
    cartTotal,
    orderdBy: user._id,
  });

  res.json({ ok: true });
};

exports.getUserCart = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOne({ orderdBy: user._id }).populate(
    "products.product"
  );

  //const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({
    products: cart.products,
    cartTotal: cart.cartTotal,
    totalAfterDiscount: cart.totalAfterDiscount,
  });
};

exports.emptyCart = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id });

  res.json({ cart });
};

exports.saveAddress = async (req, res, next) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address },
    { new: true }
  );

  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res, next) => {
  try {
    const { coupon } = req.body;

    const validCoupon = await Coupon.find({ name: coupon });

    if (validCoupon === [ ]) {
      return res.json({
        err: "Invalid Coupon",
      });
    }

    const user = await User.findOne({ email: req.user.email });

    const cart = await Cart.findOne({ orderdBy: user._id }).populate(
      "products.product",
      "_id title price"
    );

    const { products, cartTotal } = cart;

    //console.log('product', products, 'cartTotal', cartTotal)

    //console.log("cartTotal", cartTotal, "discount", validCoupon[0].discount);

    //calculate the total after discount

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon[0].discount) / 100
    ).toFixed(2);

    //console.log(totalAfterDiscount);

    await Cart.findOneAndUpdate(
      { orderdBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );

    res.json(totalAfterDiscount);
    
  } catch (err) {
    res.json({err: 'Invalid coupon'})
  }
};

exports.createOrder = async(req, res, next) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email });

  const { products } = await Cart.findOne({ orderdBy: user._id });
  
  const order = await Order.create({
    products,
    paymentIntent,
    orderdBy: user._id
  });


  //when product is sold DECREAMENT THE QUANTITY AND INCREAMENT THE SOLD

  const bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id },
        update: {$inc: {quantity: -item.count, sold: +item.count}}
      }
    }
  })

  const updated = await Product.bulkWrite(bulkOptions, {});

  //console.log('PRODUCT -QUANTITY +SOLD', updated);
  
  res.json({ ok: true });
}

exports.orders = async(req, res, next) => {
  const user = await User.findOne({ email: req.user.email });

  const userOrders = await Order.find({ orderdBy: user._id }).populate('products.product')

  res.json(userOrders);
}

exports.addToWishList = async(req, res, next) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate({ email: req.user.email }, { $addToSet: { wishlist: productId } }, { new: true });

  res.json({ ok: true });
}

exports.wishlist = async(req, res, next) => {
  const list = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist');

  res.json(list)
}

exports.removeFromWishlist = async(req, res, next) => {
  const { productId } = req.params;

  const user = await User.findOneAndUpdate({ email: req.user.email }, { $pull: { wishlist: productId } });

  res.json({ok: true})
}