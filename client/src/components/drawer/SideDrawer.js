import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.png";

const imageStyle = {
  width: "100%",
  height: 50,
  objectFit: "cover",
};

const SideDrawer = () => {
  const dispatch = useDispatch();
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  return (
    <Drawer
      className="text-center"
      title={`Cart / ${cart.length} Product`}
      onClose={() =>
        dispatch({
          type: "SET_VISIBLE",
          payload: false,
        })
      }
      visible={drawer}
    >
      {cart.map((p) => (
        <div key={p._id} className="row">
          <div className="col">
            {p.images.length ? (
              <>
                <img src={p.images[0].url} alt={p.title} style={imageStyle} />
                <p
                  style={{ color: "gold", backgroundColor: "teal" }}
                  className="text-center bg-primary"
                >
                  {p.title} x {p.count}{" "}
                </p>
              </>
            ) : (
              <>
                <img src={laptop} alt={p.title} style={imageStyle} />
                <p
                  style={{ color: "gold", backgroundColor: "teal" }}
                  className="text-center "
                >
                  {p.title} x {p.count}{" "}
                </p>
              </>
            )}
          </div>
        </div>
      ))}

      <Link to="/cart">
        <button
          onClick={() =>
            dispatch({
              type: "SET_VISIBLE",
              payload: false,
            })
          }
          className="text-center btn btn-primary btn-raised btn-block"
        >Go to cart</button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
