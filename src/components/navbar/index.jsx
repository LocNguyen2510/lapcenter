import React from "react";
import "./styles.scss";
export default function Navbar() {
  return (
    <div className=" d-flex justify-content-between navbar-container        ">
      <div className="text-danger">TEXT DANGER</div>
      <div className="title">
        <ul className="d-flex">
          <li>Trang chủ</li>
          <li>Giới thiệu</li>
          <li>Liên hệ</li>
          <li>Đăng xuất</li>
        </ul>
      </div>
    </div>
  );
}
