import React from "react";
import "./styles.scss";
import { Link, Navigate } from "react-router-dom";



export default function Navbar() {
  const customerName=localStorage.getItem('customerName')
  const accessToken=localStorage.getItem('accessToken')
  const userId=localStorage.getItem('userId')
  return (
    <div className=" d-flex justify-content-between navbar-container">
      <div className="text-danger">TEXT DANGER</div>
      <div className="title">
        <ul className="d-flex">
          <li>  <Link to="/">Trang chủ</Link>  </li>
          <li>  <Link to="about">Giới thiệu</Link> </li>
          <li> <Link to="call">Liên hệ</Link> </li>
          <div>{ 
          customerName &&
          <>
          <li onClick={()=>{localStorage.removeItem('customerName');
       localStorage.removeItem('accessToken');localStorage.removeItem('userId');}} > 
       <a href="/">Đăng xuất</a>
       </li>
          </>}
          {
          !customerName &&
          <>
          <li> <Link to="login">Đăng nhập</Link></li>
          </>


    
          }
          </div>
          
        </ul>
      </div>
    </div>
  );
}
