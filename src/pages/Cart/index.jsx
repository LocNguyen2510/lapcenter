import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/navbar";
import "./styles.scss";
import iconCart from "../../assets/imgs/cart.png";
import iconDelete from "../../assets/imgs/delete.png";
const customerName = localStorage.getItem("customerName");
// const [loading, setLoading] = useState(true);
// const userId = localStorage.getItem("userId");
// const [product, setProduct] = useState();
// const [image, setImage] = useState("");

// const fetchAPI = () => {
//   setLoading(true);
//   axios
//     .get('https://ap-center.herokuapp.com/api/cart'),{
//       userId: userId,
//       productId: product._id,
//       productName:product.name,
//       productBrand: product.brand,
//       image:image,
//       price: product.price,
//     }
//     .then(function (response) {
//       // handle success
//       const data = response.data.products;
//       console.log("Histories: ", data);
//       setData(data);
//       setLoading(false);
//     })
//     .catch(function (error) {
//       // handle error
//       console.log(error);
//     });
// };
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
const MyCarts = () => {
  return (
    <>
      <Navbar />
      <div className="containerMyCarts">
        <div className="title">
        <span className="h3">Giỏ hàng của</span> <span className="h3 text-success fw-bold">{customerName}</span>
        </div>
        <div className="d-flex tb-header rounded-top fw-bold text-light ">
          <p className="tbh-img">Hình ảnh</p>
          <p className="tbh-name">Tên sản Phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Giá</p>
          <p className="tbh-actions">Hành động</p>
        </div>
        {/* CUSTOM TABLE */}
        {/* <div className="d-flex tb-body fw-bold text-light ">
          <p className="tbh-img">Hình ảnh</p>
          <p className="tbh-name">Tên sản Phẩm</p>
          <p className="tbh-brand">Hãng</p>
          <p className="tbh-price">Giá</p>
          <p className="tbh-actions">Hành động</p>
        </div> */}
        {/* LOOP DATA */}
        {fakedata.map((item) => (
          <div className="d-flex tb-body fw-bold border-top-0">
            <img className="tbb-img" src={item.image}></img>
            <p className="tbh-name mt-4">{item.productName}</p>
            <p className="tbh-brand mt-4">{item.productBrand}</p>
            <p className="tbh-price mt-4">{item.price} VND</p>
            <div className="tbh-actions">
                <div className="tbbcart d-flex">
              <div className="bg-icon">
                <img className="iconcart mt-2 " src={iconCart}></img>
              </div>
              <div className="bg-icon">
                <img className="iconcart mt-2" src={iconDelete}></img>
              </div>
            </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default MyCarts;
