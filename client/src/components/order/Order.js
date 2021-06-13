import React, { useState, useEffect } from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";

const Order = ({ handleStatusChange, order }) => {
  const [color, setColor] = useState("");

  useEffect(() => {
    if (order.orderStatus === "Not Processed") {
      return setColor("grey");
    }
    if (order.orderStatus === "Processing") {
      return setColor("yellow");
    }
    if (order.orderStatus === "Dispatched") {
      return setColor("orange");
    }
    if (order.orderStatus === "Cancelled") {
      return setColor("red");
    }
    if (order.orderStatus === "Completed") {
      return setColor("green");
    }
  }, [order.orderStatus]);

  return (
    <div
      style={{
        backgroundColor: color,
        color: color !== "grey" ? "white" : "black",
      }}
      className="btn btn-block "
    >
      <ShowPaymentInfo order={order} showStatus={false} />
      <div className="row">
        <div className="col-md-4">Delivery Status</div>
        <div className="col-md-8">
          <select
            name="status"
            style={{ color: color !== "grey" ? "purple" : "black" }}
            onChange={(evt) => handleStatusChange(order._id, evt.target.value)}
            className="form-control"
            defaultValue={order.orderStatus}
          >
            <option value="Not Processed">Not Processed</option>
            <option value="Processing">Processing</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Order;
