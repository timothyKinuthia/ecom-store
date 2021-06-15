import React, {useState} from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { showAverage } from "../../functions/rating";

import laptop from "../../images/surface-pro-platnium.png";

const { Meta } = Card;

const ProductCard = ({ product }) => {

  const [tooltip, setTooltip] = useState('Click to add')

  const { title, description, images, slug, price } = product;

  const dispatch = useDispatch();

  
  const handleAddToCart = () => {
    //create cart array

    let cart = [];

    if (window !== 'undefined') {
      //check if the cart is in local storage
      if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'))
      }

      //push new product to cart 
      cart.push({
        ...product,
        count: 1
      })

      let unique = _.uniqWith(cart, _.isEqual);

      localStorage.setItem('cart', JSON.stringify(unique));

      setTooltip('Added')

      //dispatch to global state
      dispatch({
        type: 'ADD_TO_CART',
        payload: unique
      })

      dispatch({
        type: 'SET_VISIBLE',
        payload: true
      })
    }
  }
  return (
    <Grid item lg={4} md={4} sm={6} xs={12}>
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <div className="text-center pt-1 pb-3">No rating yet</div>
      )}
      <Card
        style={{ maxWidth: 350}}
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{
              height: 320,
              width: "100%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        }
        actions={[
          <Link to={`/product/${slug}`}>
            <EyeOutlined /><br/>View the Product
          </Link>,
          <Tooltip title={tooltip}>
            <a onClick={handleAddToCart}  disabled={product.quantity < 1}>
            <ShoppingCartOutlined /><br/>{product.quantity < 1 ? 'Out of stock' : 'Add to cart'}
            </a>
          </Tooltip>,
        ]}
      >
        <Meta
          title={<p>{title}<br/><span style={{color: 'red'}}>${price.toFixed(2)}</span> </p> }
          description={`${description && description.substring(0, 40)}...`}
          className="m-2"
        />
      </Card>
    </Grid>
  );
};

export default ProductCard;
