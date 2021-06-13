import React, { useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { Modal } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";

const RatingModal = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  
  const history = useHistory();
    const { slug } = useParams();
  
  const handleModal = () => {
      if (user && user.token) {
          setModalVisible(true);
      } else {
          history.push({
              pathname: '/login',
              state: { from: `/product/${slug}` }
          });
      }
  }

  return (
    <>
      <div onClick={handleModal}>
        <StarOutlined className="text-danger" />
        <br /> {user ? "Leave a rating" : "Login to leave a rating"}
      </div>
      
      <Modal
        title="Leave your rating"
        centered
        visible={modalVisible}
        onOk={() => {
          setModalVisible(false);
          toast.success("Thanks for your review.");
        }}
        onCancel={() => setModalVisible(false)}
      >
        {children}
      </Modal>
    </>
  );
};

export default RatingModal;
