import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
} from "../functions/user";

//products, cartTotal, totalAfterDiscount

const Checkout = ({history}) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token).then((res) => {
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
    });
  }, []);

  const handleEmptyCart = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }

    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });

    setTotalAfterDiscount(0);
    setCoupon('')

    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      toast.success("Cart is empty. Continue shopping");
    });
  };

  const saveAddressToDB = () => {
    saveUserAddress(address, user.token).then((res) => {
      if (res.data.ok) {
        setAddressSaved(true);
        toast.success("Address saved");
      }
    });
  };
  const showAddress = () => (
    <>
      <ReactQuill theme="snow" onChange={setAddress} />
      <button onClick={saveAddressToDB} className="btn btn-primary mt-2">
        Save
      </button>
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}{" "}
        </p>
      </div>
    ));

  const applyDiscountCoupon = () => {
    applyCoupon(coupon, user.token).then((res) => {
      if (res.data.err) {
        setDiscountError(res.data.err);
        setTotalAfterDiscount(0);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true
        })
      } else {
        setTotalAfterDiscount(res.data);
        dispatch({
          type: 'COUPON_APPLIED',
          payload: true
        })
        setDiscountError("");

        //push the totalAfterDiscount to redux store true or false
      }
    });
  };

  const showApplyCoupon = () => (
    <>
      <input
        type="text"
        className="form-control"
        value={coupon}
        onChange={(evt) => {
          setCoupon(evt.target.value);
          setDiscountError("");
          setTotalAfterDiscount(0)
        }}
      />
      <button onClick={applyDiscountCoupon} className="btn btn-primary mt-2">
        Apply
      </button>
    </>
  );
  return (
    <div className="row">
      <div className="col-md-6">
        <h4>Delivery Address</h4>
        <br />
        <br />
        {showAddress()}
        <hr />
        <h4>Got Coupon?</h4>
        <br />
        {showApplyCoupon()}
        <br />
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
      </div>
      <div className="col-md-6">
        <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length} </p>
        <hr />
        <div>{showProductSummary()}</div>
        <p>
          Cart Total:{" "}
          <span style={{ color: "orange", fontWeight: "700" }}>${total}</span>
        </p>
        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">Discount applied: Total payable ${totalAfterDiscount}</p>
        )}
        <div className="row">
          <div className="col-md-6">
            <button onClick={() => history.push('/payment')} disabled={!addressSaved} className="btn btn-primary">
              Place Order
            </button>
          </div>
          <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={handleEmptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
