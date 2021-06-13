import React from "react";
import { Link } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import laptop from "../../images/surface-pro-platnium.png";

const { Meta } = Card;

const AdminCard = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;
  return (
    <Grid item>
      <Card
        style={{ width: 350 }}
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            alt={title}
            style={{
              height: 200,
              width: "100%",
              objectFit: "cover",
              margin: "auto",
            }}
          />
        }
        actions={[
          <Link to={`/admin/product/${slug}`}>
            <EditOutlined />
          </Link>,
        <DeleteOutlined onClick={() => handleRemove(slug)} />]}
      >
        <Meta
          title={title}
          description={`${description && description.substring(0, 40)}...`}
          className="m-2"
        />
      </Card>
    </Grid>
  );
};

export default AdminCard;
