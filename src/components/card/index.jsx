import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import './styles.scss'

export default function Card({product}) {
  const navigate=useNavigate();
  return (
    <div className="card-product">
      {/* <div className="img"> */}
        <img src={product.images[0]} alt="" className="img" />
      {/* </div> */}
      <div className="info-product">
        <h5>{product.name}</h5>
        <p>Hang:{product.brand}</p>
        <p>{product.cpu}</p>
        <p>Gia:{product.price}</p>
      </div>
      <div className="btn-view">
        <Button className="btn" variant="primary" onClick={()=>{navigate(`/product/${product._id}`,{state:{id: product._id}})}}>Xem Chi Tiết</Button>{" "}
      </div>
    </div>
  );
}
        