import React, { useEffect, useState } from "react";
import {
  getProductsByCount,
  fetchProductsByFilter,
} from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import { useSelector, useDispatch } from "react-redux";
import { Menu, Slider, Divider, Checkbox, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ProductCard from "../components/cards/ProductCard";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [price, setPrice] = useState([0, 0]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [ok, setOk] = useState(false);
  const [categoryIds, setCategoryIds] = useState([]);
  const [star, setStar] = useState("");
  const [subs, setSubs] = useState([]);
  const [sub, setSub] = useState("");
  const [brands, setBrands] = useState([
    "Apple",
    "Sumsung",
    "Microsoft",
    "Lenovo",
    "Asus",
  ]);
  const [brand, setBrand] = useState("");

  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);

  const [color, setColor] = useState("");

  const [shipping, setShipping] = useState("");

  const { search } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const { text } = search;

  //1)LOAD PRODUCTS BY DEFAULT ON PAGE LOAD
  useEffect(() => {
    loadAllProducts();
    fetchCategories();
    getSubs()
      .then((res) => {
        setSubs(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10).then((res) => {
      setProducts(res.data.products);
      setLoading(false);
    });
  };

  const filterProducts = (arg) => {
    fetchProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  const fetchCategories = () => {
    getCategories().then((res) => {
      setCategories(res.data);
    });
  };

  //2)LOAD PRODUCTS ON USER SEARCH INPUT
  useEffect(() => {
    const delayed = setTimeout(() => {
      filterProducts({ query: text });
    }, 300);
    if (!text) {
      loadAllProducts();
    }
    return () => clearTimeout(delayed);
  }, [text]);

  useEffect(() => {
    if (!text) {
      loadAllProducts();
    }
  }, [text]);

  //3)LOAD PRODUCTS BASED ON PRICE

  useEffect(() => {
    filterProducts({ price });
  }, [ok]);

  const handleSlider = (val) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setPrice(val);
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  //4)LOAD PRODUCTS BASED ON CATEGORIES
  //show categories in a list of checkbox

  const showCategories = () =>
    categories.map((cat) => (
      <div key={cat._id}>
        <Checkbox
          className="pb-2 pr-4 pl-4"
          value={cat._id}
          checked={categoryIds.includes(cat._id) ? true : false}
          onChange={handleChecked}
        >
          {cat.name}{" "}
        </Checkbox>
        <br />
      </div>
    ));

  //handle check for categories

  const handleChecked = (evt) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    const newIds = [...categoryIds];

    const val = evt.target.value;

    const newState = new Set(newIds);

    if (!newState.has(val)) {
      newState.add(val);
    } else {
      newState.delete(val);
    }

    const newArray = Array.from(newState);
    setCategoryIds(newArray);

    filterProducts({ category: newArray });
  };

  //SHOW PRODUCTSBY STAR RATING

  const handleStarClick = (num) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setStar(num);
    filterProducts({ stars: num });
  };

  const showStars = () => (
    <>
      <div className="pr-4 pl-4 pb-2">
        <Star starClicked={handleStarClick} numStars={5} />
      </div>

      <div className="pr-4 pl-4 pb-2">
        <Star starClicked={handleStarClick} numStars={4} />
      </div>

      <div className="pr-4 pl-4 pb-2">
        <Star starClicked={handleStarClick} numStars={3} />
      </div>

      <div className="pr-4 pl-4 pb-2">
        <Star starClicked={handleStarClick} numStars={2} />
      </div>

      <div className="pr-4 pl-4 pb-2">
        <Star starClicked={handleStarClick} numStars={1} />
      </div>
    </>
  );

  //6.SHOW PRODUCTS BY SUB CATEGORIES

  const showSubs = () =>
    subs.map((s) => (
      <div
        key={s._id}
        onClick={() => handleSubClick(s)}
        className="p-1 m-1 badge badge-primary"
        style={{ cursor: "pointer" }}
      >
        {s.name}
      </div>
    ));

  const handleSubClick = (s) => {
    setSub(s);

    filterProducts({ sub: s._id });

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setCategoryIds([]);
    setBrand("");
    setColor("");
    setShipping("");
  };

  //7.SHOW PRODUCTS BASED ON BRAND

  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b}
        value={b}
        checked={b === brand}
        onChange={handleBrand}
        className="pb-1 pl-4 pr-5"
      >
        {b}
      </Radio>
    ));

  const handleBrand = (evt) => {
    setBrand(evt.target.value);

    filterProducts({ brand: evt.target.value });

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSub("");
    setCategoryIds([]);
    setStar("");
    setColor("");
    setShipping("");
  };

  //SHOW PRODUCTS BASED ON COLORS

  const showColors = () =>
    colors.map((col) => (
      <Radio
        key={col}
        value={col}
        checked={col === color}
        onChange={handleColor}
        className="pb-1 pl-4 pr-5"
      >
        {col}
      </Radio>
    ));

  const handleColor = (evt) => {
    setColor(evt.target.value);

    filterProducts({ color: evt.target.value });

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSub("");
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setShipping("");
  };

  //9.SHOW PRODUCTS BASED ON SHIPPING yes/no

  const showShipping = () => (
    <>
      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShipping}
        value="Yes"
        checked={shipping === "Yes"}
      >
        Yes
      </Checkbox>

      <Checkbox
        className="pb-2 pl-4 pr-4"
        onChange={handleShipping}
        value="No"
        checked={shipping === "No"}
      >
        No
      </Checkbox>
    </>
  );

  const handleShipping = (evt) => {
    setShipping(evt.target.value);

    filterProducts({ shipping: evt.target.value });

    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });
    setPrice([0, 0]);
    setSub("");
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Grid container direction="column">
        <Grid item container>
          <Grid item container direction="column" md={3}>
            <Grid item style={{ paddingTop: "1rem" }}>
              <Typography variant="h5" align="center">
                Search/Filters
              </Typography>
            </Grid>
            <Divider />
            <Grid item>
              <Menu
                defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
                mode="inline"
              >
                {/* 1) PRICE */}
                <SubMenu
                  key="1"
                  title={
                    <span className="h6">
                      <DollarOutlined />
                      Price
                    </span>
                  }
                >
                  <div>
                    <Slider
                      className="ml-4 mr-4"
                      tipFormatter={(val) => `$${val}`}
                      range
                      max="6000"
                      value={price}
                      onChange={handleSlider}
                    />
                  </div>
                </SubMenu>
                {/* 2)CATEGORIES */}
                <SubMenu
                  key="2"
                  title={
                    <span className="h6">
                      <DownSquareOutlined />
                      Categories
                    </span>
                  }
                >
                  <div>{showCategories()}</div>
                </SubMenu>
                <SubMenu
                  key="3"
                  title={
                    <span className="h6">
                      <StarOutlined />
                      Rating
                    </span>
                  }
                >
                  <div>{showStars()}</div>
                </SubMenu>
                {/* SUBCATEGORIES */}
                <SubMenu
                  key="4"
                  title={
                    <span className="h6">
                      <DownSquareOutlined />
                      Sub Categories
                    </span>
                  }
                >
                  <div className="pl-4 pr-4">{showSubs()}</div>
                </SubMenu>
                {/* BRANDS */}
                <SubMenu
                  key="5"
                  title={
                    <span className="h6">
                      <DownSquareOutlined />
                      Brands
                    </span>
                  }
                >
                  <div className="pr-4">{showBrands()}</div>
                </SubMenu>
                {/* COLORS */}
                <SubMenu
                  key="6"
                  title={
                    <span className="h6">
                      <DownSquareOutlined />
                      Colors
                    </span>
                  }
                >
                  <div className="pr-4">{showColors()}</div>
                </SubMenu>
                {/* SHIPPING */}
                <SubMenu
                  key="7"
                  title={
                    <span className="h6">
                      <DownSquareOutlined />
                      Shipping
                    </span>
                  }
                >
                  <div className="pr-4">{showShipping()}</div>
                </SubMenu>
              </Menu>
            </Grid>
          </Grid>
          <Grid item container md={9}>
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4
                className="text-danger"
                style={{ paddingTop: "1rem", margin: "0 auto" }}
              >
                Products
              </h4>
            )}
            {!products.length && (
              <h5 style={{ color: "red", margin: "0 auto" }}>
                No products found
              </h5>
            )}
            <Grid item container spacing={2} style={{ paddingTop: "2rem" }}>
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Shop;
