import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { Col, Card, Tabs, Tooltip } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import laptop from "../../images/laptop.png";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { addWishlist } from '../../functions/user';
import { toast } from "react-toastify";

const { TabPane } = Tabs;

const SingleProduct = ({ product, onStarClick, star }) => {

  const [tooltip, setTooltip] = useState('Click to add');

  const { user, cart } = useSelector(state => ({ ...state }));

  const dispatch = useDispatch();
  const history = useHistory();

  const { title, images, description, _id } = product;

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

  const handleAddToWishlist = evt => {
    evt.preventDefault();
    addWishlist(product._id, user.token).then(res => {
      toast.success('ADDED TO WISHLIST');
      history.push('/user/wishlist')
    })
  }

  return (
    <>
      <Col md={{ span: 14 }} sm={{ span: 24 }} xs={{ span: 24 }}>
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} alt={title} key={image.public_id} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                src={laptop}
                alt="laptop"
                style={{ height: 250, objectFit: "cover" }}
                className="mb-3 card-image"
              />
            }
          ></Card>
        )}
        <Tabs type="card">
          <TabPane tab="description" key="1">
            {description && description}
          </TabPane>
          <TabPane tab="More" key="2">
            For product information contact us on xxxx-xxx-xxx
          </TabPane>
        </Tabs>
      </Col>
      <Col
        md={{ span: 10 }}
        sm={{ span: 24 }}
        style={{ textAlign: "center" }}
        xs={{ span: 24 }}
      >
        <h1 className="bg-info p-3">{title}</h1>

        {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="text-center pt-1 pb-3">No rating yet</div>
        )}

        <Card
          style={{ maxWidth: 450, marginLeft: "2rem" }}
          actions={[
            <>
              <Tooltip title={tooltip}>
                <a onClick={handleAddToCart}>
                  <ShoppingCartOutlined />
                </a>
              </Tooltip>
              ,
              Add to cart
            </>,
            <a onClick={handleAddToWishlist}>
              <HeartOutlined />
              <br /> Add to wishlist
            </a>,
            <RatingModal>
              <StarRating
                name={_id}
                numberOfStars={5}
                rating={star}
                changeRating={onStarClick}
                isSelectable={true}
                starRatedColor="orange"
              ></StarRating>
            </RatingModal>,
          ]}
        >
          <ProductListItems product={product} />
        </Card>
      </Col>
    </>
  );
};

export default SingleProduct;
