import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.png";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {CheckCircleOutlined, CloseCircleOutlined, CloseOutlined} from '@ant-design/icons'

const ProductCardInCheckout = ({ p }) => {
  const colors = ["Black", "Brown", "Silver", "White", "Blue"];
  
  const dispatch = useDispatch();

  let cart = []
  const handleColorChange = (evt) => {
      if (typeof window !== 'undefined') {
          if (localStorage.getItem('cart')) {
              cart = JSON.parse(localStorage.getItem('cart'))
          }

          cart.map((product, i) => {
              if (product._id === p._id) {
                  cart[i].color = evt.target.value
              }
              return cart
          })
          
          localStorage.setItem('cart', JSON.stringify(cart));

          dispatch({
              type: 'ADD_TO_CART',
              payload: cart
          })
      }
  };
  
  const handleQuantityChange = evt => {
      
      let count = evt.target.value < 1 ? 1 : evt.target.value;

      if (count > p.quantity) {
          toast.error(`Max available quantity is ${p.quantity}`);
          return;
      }

      let cart = [];

      if (typeof window !== 'undefined') {
          if (localStorage.getItem('cart')) {
              cart = JSON.parse(localStorage.getItem('cart'))
          }

          cart.map((product, i) => {
              if (product._id === p._id) {
                  cart[i].count = count
              }

              return cart
          })

          localStorage.setItem('cart', JSON.stringify(cart));

          dispatch({
              type: 'ADD_TO_CART',
              payload: cart
          })
      }
  }
  
  const handleRemove = () => {
    let cart = [];

    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'))
        }

        cart.map((product, i) => {
            if (product._id === p._id) {
                cart.splice(i, 1)
            }

            return cart
        })

        localStorage.setItem('cart', JSON.stringify(cart));

        dispatch({
            type: 'ADD_TO_CART',
            payload: cart
        })

    }
  }
  return (
    <tbody>
      <tr>
        <td>
          <div style={{ width: 100, height: "auto" }}>
            {p.images.length ? (
              <ModalImage small={p.images[0].url} large={p.images[0].url} />
            ) : (
              <ModalImage small={laptop} large={laptop} />
            )}
          </div>
        </td>
        <td>{p.title} </td>
        <td>${p.price} </td>
        <td>{p.brand} </td>
        <td style={{width: 90}} className='text-center'>
          <select
            onChange={handleColorChange}
            name="color"
            className="form-control"
          >
            {p.color ? <option value={p.color} >{p.color}</option> : <option>Select</option>}
            {colors
              .filter((col) => col !== p.color)
              .map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
          </select>
        </td>
        <td>
            <input type="number" className='form-control' value={p.count} onChange={handleQuantityChange} />
        </td>
        <td className='text-center'>{p.shipping === 'Yes' ? <CheckCircleOutlined style={{color: 'green'}} /> : <CloseCircleOutlined style={{color: 'red'}}/>} </td>
        <td className='text-center'><CloseOutlined onClick={handleRemove} className='text-danger pointer' /></td>
      </tr>
    </tbody>
  );
};

export default ProductCardInCheckout;
