import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";
import { Button, Row, Col } from "antd";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const showCategories = () => {
    return categories.map((cat) => (
      <Col
        lg={{ span: 8 }}
        md={{ span: 12 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
        key={cat._id}
        className="col"
      >
        <Link to={`/category/${cat.slug}`}>
          <Button size="large" style={{ width: "15rem", margin: "2rem" }}>
            {cat.name}
          </Button>
        </Link>
      </Col>
    ));
  };

  return (
    <div className="container">
      <Row justify="space-around">
        {loading ? (
          <h4 className="text-center">Loading...</h4>
        ) : (
          showCategories()
        )}
      </Row>
    </div>
  );
};

export default CategoryList;
