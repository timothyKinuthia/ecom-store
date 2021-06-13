import React, { useEffect, useState } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";
import { useSelector } from "react-redux";
import { Row, Col, Divider } from "antd";
import Grid from '@material-ui/core/Grid';

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setLoading(true);
    getCategory(slug, user.token).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <Row>
        <Col span={24} >
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Product{products.length > 1 ? 's' : ''} in {category.name} category
            </h4>
          )}
        </Col>
      </Row>
      <Divider/>
      <Grid container spacing={3}>
              {products && products.map(p => (
              <ProductCard key={p._id} product={p} />
          ))}
      </Grid>
    </div>
  );
};

export default CategoryHome;
