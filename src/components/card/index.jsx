import React from "react";
import { Button } from "react-bootstrap";
import './styles.scss'

export default function Card({product}) {
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
        <Button className="btn" variant="primary">Xem Chi Tiết</Button>{" "}
      </div>
    </div>
  );
}
