import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import "./styles.scss";
import iconCart from "../../assets/imgs/cart.png";
import iconDelete from "../../assets/imgs/delete.png";
import Card from "../../components/card";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const MyHistory = () => {
  const navigate =useNavigate();
  const customerName = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/history/${userId}`)
      .then(function (response) {
        // handle success
        const data = response.data.products;
        console.log("Carts: ", data);
        setData(data.reverse());
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <Navbar />
      {!loading ? (
      <div className="containerMyHistory">
        <div className="title">
          <span className="h3">Lịch Sử Mua Hàng Của</span>{" "}
          <span className="h3 text-success fw-bold">{customerName}</span>
        </div>
        <div className="d-flex tb-header rounded-top fw-bold text-light ">
          <p className="tbh-img">STT</p>
          <p className="tbh-name">Tên sản Phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Số Lượng</p>
          
        
        </div>
      
        {data.map((item,index )=> (
          <div className="d-flex tb-body fw-bold border-top-0">
            <p className="tbb-img">{index+1}</p>
            <p className="tbh-name tbb-name mt-4">{item.productName}</p>
            <p className="tbh-brand mt-4">{item.productBrand}</p>
            <p className="tbh-price mt-4">{item.quantity}</p>
          </div>
        ))}
        {data.length ==0 && <div className="text-center mt-2">
          <p>Không có sản phẩm nào trong giỏ hàng!</p></div>}
      </div>): (
          <div className="spin ">
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
          </div>
        )}
    </>
  );
};
export default MyHistory;
