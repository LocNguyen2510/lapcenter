import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar";
import "./styles.scss";
import iconEye from "../../../assets/imgs/eye.png"
import iconDelete from "../../../assets/imgs/delete.png";
import Card from "../../../components/card";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const fakedata = [
  {
    _id: "6257c89d462518002330074f",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-04-14T07:09:17.158Z",
    updatedAt: "2022-04-14T07:09:17.158Z",
    __v: 0,
  },
  {
    _id: "6298ba34505b90002306d2e3",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-06-02T13:25:08.172Z",
    updatedAt: "2022-06-02T13:25:08.172Z",
    __v: 0,
  },
];
const Orders = () => {
  const navigate =useNavigate();
  const customerName = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/order`)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Order: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleDelete=(cartID)=>{
    setLoading(true);
    console.log(cartID)
    axios.delete(`https://lap-center-v1.herokuapp.com/api/cart/removeCartInCart/${cartID}`)
      .then(function (response) {
        
        // handle success
        setLoading(false);
        fetchAPI()
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  const handleShowOrderStatus=(orderStatus)=>{
    if(orderStatus===1){
        return'Vừa đặt hàng'
    } if(orderStatus===2){
        return'Đang giao hàng'
    } if(orderStatus===3){
        return'Đã nhận hàng'
    } if(orderStatus===4){
        return'Hoàn trả hàng'
    }
  }
  const handleShowColorOrderStatus=(orderStatus)=>{
    if(orderStatus===1){
        return'text-success'
    } if(orderStatus===2){
        return'text-primary'
    } if(orderStatus===3){
        return'text-info'
    } if(orderStatus===4){
        return'text-dager'
    }
  }
  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <Navbar />
      {!loading ? (
      <div className="containerOrders">
        <div className="title">
          <span className="h3">Quản Lí Đơn Hàng</span>{" "}
        </div>
        <div className="d-flex tb-header rounded-top fw-bold text-light ">
          <p className="tbh-name" >Tên khách hàng</p>
          <p className="tbh-brand" style={{textAlign:"center"}}>Tên sản phẩm</p>
          <p className="tbh-quatity" >Số lượng</p>
          <p className="tbh-price">Trạng thái</p>
          <p className="tbh-actions">Hành động</p>
        </div>
        {data.map((item) => (
          <div className="d-flex tb-body fw-bold border-top-0">
            <p className="tbh-name mt-4">{item.customerName}</p>
            <p className="tbh-brand mt-4">{item.productName}</p>
          <p className="tbh-quatity mt-4" >{item.quantity}</p>

            <p className={`tbh-price mt-4 ${handleShowColorOrderStatus(item.orderStatus)}`}>{handleShowOrderStatus(item.orderStatus)}</p>
            <div className="tbh-actions tbb-actions">
              <div className="tbbcart d-flex " > 
                <div className="bg-icon"  >
                  <img className="iconcart mt-2 " onClick={()=>navigate(`/buy/${item.productId} `,{state:{ id:item.productId}})} src={iconEye}></img>
                </div>
                <div className="bg-icon">
                  <img className="iconcart mt-2" onClick={()=>handleDelete(item._id)} src={iconDelete}></img>
                </div>
              </div>
            </div>
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
export default Orders;
