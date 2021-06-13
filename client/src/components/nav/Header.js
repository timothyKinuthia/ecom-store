import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Badge } from "antd";
import {
  SettingOutlined,
  AppstoreOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined
} from "@ant-design/icons";
import firebase from "firebase/app";
import "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const style2 = {
  color: "gray",
  margin: "8px 0px 4px 10px",
  fontFamily: 'Lobster',
  
}

const Header = () => {
  const { user, cart } = useSelector((state) => ({ ...state }));

  const dispatch = useDispatch();

  const history = useHistory();

  const [current, setCurrent] = useState("home");

  const handleClick = (evt) => {
    setCurrent(evt.key);
  };

  useEffect(() => {
    switch (window.location.pathname) {
      case "/":
        return setCurrent("home");
      case "/login":
        return setCurrent("login");
      case "/register":
        return setCurrent("register");
      case "/shop":
        return setCurrent("shop");
      case "/cart":
        return setCurrent("cart")
      default:
        return;
    }
  }, []);

  const logout = () => {
    firebase.auth().signOut();

    dispatch({ type: "LOGOUT" });

    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home" icon={<AppstoreOutlined />}>
        <Link to="/">Home</Link>
      </Item>
      <Item key="shop" icon={<ShoppingOutlined/>}>
        <Link to="/shop">
          Shop
        </Link>
      </Item>
      <Item key="cart" icon={<ShoppingCartOutlined/>}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[9, 0]}>Cart</Badge>
        </Link>
      </Item>
      <Item key="TIMTECH">
          <h2 style={style2}>TIMTECH LAPTOPS</h2>
      </Item>
      {!user && (
        <Item key="register" icon={<UserAddOutlined />} className="float-right">
          <Link to="/register">Register</Link>
        </Item>
      )}
      {!user && (
        <Item key="login" icon={<UserOutlined />} className="float-right">
          <Link to="/login">Login</Link>
        </Item>
      )}
      {user !== null && (
        <SubMenu
          key="SubMenu"
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
          <Item icon={<LogoutOutlined />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      <span className='float-right p-1'><Search/></span>
    </Menu>
  );
};

export default Header;
