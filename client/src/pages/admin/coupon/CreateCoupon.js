import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getCoupons,
  createCoupon,
  removeCoupon,
} from "../../../functions/coupon";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setLoading(true);
    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        loadCoupons();
        setLoading(false);
        setName("");
        setDiscount("");
        setExpiry("");
        toast.success(`"${res.data.name}" is created`);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons().then((res) => {
      setCoupons(res.data);
    });
  };

  const handleRemove = (couponId) => {
    if (window.confirm("Delete")) {
      removeCoupon(couponId, user.token)
        .then((res) => {
          loadCoupons();
          toast.warning(`coupon ${res.data.name} deleted`);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>Coupon</h4>
          )}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="text-muted">Name</label>
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setName(evt.target.value)}
                value={name}
                autoFocus
                required
              />

              <label className="text-muted">Discount %</label>
              <input
                type="text"
                className="form-control"
                onChange={(evt) => setDiscount(evt.target.value)}
                value={discount}
                required
              />

              <label className="text-muted">Expiry</label>
              <br />
              <DatePicker
                className="form-control"
                selected={new Date()}
                value={expiry}
                onChange={(date) => setExpiry(date)}
              />
            </div>
            <button className="btn btn-outline-primary" type="submit">
              Save
            </button>
          </form>
          <br />
          <table className="table table-bordered">
            <thead className="thead-light">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Expiry</th>
                <th scope="col">Discount</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon._id}>
                  <td>{coupon.name} </td>
                  <td>{new Date(coupon.expiry).toLocaleDateString()} </td>
                  <td>{coupon.discount} </td>
                  <td className="text-danger pointer">
                    <DeleteOutlined onClick={() => handleRemove(coupon._id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
