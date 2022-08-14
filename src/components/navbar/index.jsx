import React from "react";
import "./styles.scss";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const customerName = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const accessToken = localStorage.getItem("accessToken");
  // cach3:const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear("accessToken");
  };
  return (
    <div className=" d-flex justify-content-between navbar-container">
      <div className="text-danger">TEXT DANGER</div>
      <div className="title">
        <ul className="d-flex">
          <li>
            {" "}
            <Link to="/">Trang chủ</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="about">Giới thiệu</Link>{" "}
          </li>
          <li>
            {" "}
            <Link to="call">Liên hệ</Link>{" "}
          </li>
          {
            accessToken ?
            <li onClick={handleLogout}> <a href="">Đăng Xuất</a></li>:
            <li><Link to="/login">Đăng Nhập</Link></li>
          }

          {/* cách 2: */}
          {/* <div>
            {customerName && (
              <>
                <li
                  onClick={() => {
                    localStorage.removeItem("customerName");
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("userId");
                   cách 3: navigate('/')
                  }}
                >
                  <a href="/">Đăng xuất</a>
                </li>
              </>
            )}
            {!customerName && (
              <>
                <li>
                  {" "}
                  <Link to="login">Đăng nhập</Link>
                </li>
              </>
            )}
          </div> */}
        </ul>
      </div>
    </div>
  );
}
