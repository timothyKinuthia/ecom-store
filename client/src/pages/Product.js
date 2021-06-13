import React, { useEffect, useState } from "react";
import { getProduct, productStar } from "../functions/product";
import { Row, Col, Divider } from "antd";
import { useSelector } from "react-redux";
import SingleProduct from "../components/cards/SingleProduct";
import { getRelated } from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Grid from '@material-ui/core/Grid';

const Product = ({ match }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  const [related, setRelated] = useState([]);

  const { slug } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data.product);

        //load related products
        getRelated(res.data.product._id).then((res) => setRelated(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const ratingObject = product.ratings.find((el) => {
        return el.postedBy.toString() === user._id.toString();
      });
      ratingObject && setStar(ratingObject.star);
    }
  }, [product.ratings, user]);

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    productStar(name, newRating, user.token);
  };

  return (
    <>
      <Row style={{ marginTop: "2rem" }} justify="space-between">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </Row>
      <Divider/>
      <Row >
        <Col span={24} offset={8}>
          <h4>Related Products</h4>
        </Col>
      </Row>
      <Divider/>
      <Grid container justify='center' spacing={2} >
        {related.length
        ? related.map((r) => (
            <React.Fragment key={r._id}>
                <ProductCard product={r} />
            </React.Fragment>
            ))
        : <div className='text-center'>No related products found</div>}
      </Grid>
    </>
  );
};

export default Product;
