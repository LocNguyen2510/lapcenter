import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className=" d-flex justify-content-between navbar-container        ">
      <div className="text-danger">TEXT DANGER</div>
      <div className="title">
        <ul className="d-flex">
          <li>  <Link to="/">Trang chủ</Link>  </li>
          <li>  <Link to="about">Giới thiệu</Link> </li>
          <li> <Link to="call">Liên hệ</Link> </li>
          <li> <Link to="login">Đăng nhập</Link></li>
        </ul>
      </div>
    </div>
  );
}
