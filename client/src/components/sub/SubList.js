import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../functions/sub";
import { Button, Row, Col } from "antd";

const SubList = () => {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubs().then((res) => {
      setSubs(res.data);
      setLoading(false);
    });
  }, []);

  const showSubs = () => {
    return subs.map((s) => (
      <Col
        lg={{ span: 8 }}
        md={{ span: 12 }}
        sm={{ span: 12 }}
        xs={{ span: 24 }}
        key={s._id}
        className="col"
      >
        <Link to={`/sub/${s.slug}`}>
          <Button size="large" style={{ width: "15rem", margin: "2rem" }}>
            {s.name}
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
          showSubs()
        )}
      </Row>
    </div>
  );
};

export default SubList;