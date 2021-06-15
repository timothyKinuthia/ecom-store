import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined } from "@ant-design/icons";
import { createOrder, emptyUserCart } from '../functions/user';
import laptop from "../images/laptop.png";

const cardStyle = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#32325d",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};

const StripeCheckout = () => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const { user, coupons } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if (user.token) {
      createPaymentIntent(user.token, coupons).then((res) => {
        setClientSecret(res.data.clientSecret);
        setCartTotal(res.data.cartTotal);
        setTotalAfterDiscount(res.data.totalAfterDiscount);
        setPayable(res.data.payable);
      });
    }
  }, [user.token, coupons]);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: evt.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      //HERE YOU GET RESULTS AFTER SUCCESSFUL PAYMENT
      //THEN CREATE ORDER AND SAVE IN THE DATABASE FOR THE ADMIN TO PROCESS
      createOrder(payload, user.token).then(res => {
          if (res.data.ok) {
              //empty cart from local storage
              if (typeof window !== 'undefined') {
                  localStorage.removeItem('cart');
              }

              //empty cart from redux store
              dispatch({
                  type: 'ADD_TO_CART',
                  payload: []
              });

              dispatch({
                  type: 'COUPON_APPLIED',
                  payload: false
              })

              emptyUserCart(user.token)

              //empty cart from database
          }
      }).catch()
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  const handleChange = async (evt) => {
    setDisabled(evt.empty);
    setError(evt.error ? evt.error.message : "");
  };

  return (
    <>
      {!succeeded && (
        <div>
          {coupons && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
        </div>
      )}
      <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={laptop}
              alt="laptop"
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" />
              <br />
              Total: ${cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" />
              <br />
              Total payable: ${(payable / 100).toFixed(2)}
            </>,
          ]}
        ></Card>
      </div>
      <form id="payment-form" className="strip-form" onSubmit={handleSubmit}>
        <CardElement
          id="card-element"
          options={cardStyle}
          onChange={handleChange}
        />
        <button
          className="stripe-button"
          disabled={processing || disabled || succeeded}
        >
          <span id="button-text">
            {processing ? <div className="spinner"></div> : "Pay"}
          </span>
        </button>
        <br />
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        <p className={succeeded ? "result-message" : "result-message hidden"}>
          Payment Successful.{" "}
          <Link to="/user/history">See it in your purchase history.</Link>{" "}
        </p>
      </form>
    </>
  );
};

export default StripeCheckout;
