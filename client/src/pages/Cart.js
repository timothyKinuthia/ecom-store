import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import ProductCardInCheckout from "../components/cards/ProductCardInCheckout";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { cart, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const saveOrderToDB = () => {
    userCart(cart, user.token)
      .then((res) => {
        if (res.data.ok) history.push("/checkout");
      })
      .catch((err) => console.log(err));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th scope="col">Image</th>
          <th scope="col">Title</th>
          <th scope="col">Price</th>
          <th scope="col">Brand</th>
          <th scope="col">Color</th>
          <th scope="col">Count</th>
          <th scope="col">Shipping</th>
          <th scope="col">Remove</th>
        </tr>
      </thead>
      {cart.map((p) => (
        <ProductCardInCheckout key={p._id} p={p} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid pt-2">
      <div className="row">
        <div className="col-md-9">
          <h4>
            Cart / {cart.length} Product{cart.length > 1 ? "s" : ""}{" "}
          </h4>
          {!cart.length ? (
            <h4>
              No products in cart. <Link to="/shop">Continue Shopping</Link>
            </h4>
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-3">
          <h4>Order Summary</h4>
          <Divider />
          <p>Products</p>
          {cart.map((cat, i) => (
            <div key={i}>
              <p>
                {cat.title} x {cat.count} = ${cat.price * cat.count}{" "}
              </p>
            </div>
          ))}
          <Divider />
          Total: <b style={{ color: "red" }}>${getTotal()}</b>
          <Divider />
          {user ? (
            <button
              onClick={saveOrderToDB}
              disabled={!cart.length}
              className="btn btn-sm btn-primary mt-2"
            >
              Proceed to checkout
            </button>
          ) : (
            <button className="btn btn-sm btn-primary mt-2">
              <Link to={{ pathname: "login", state: { from: "cart" } }}>
                Login to checkout
              </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
