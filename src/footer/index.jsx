import React from "react";
import './styles.scss'

export default function Footer() {
  return (
    <div className="footerContainer">
      <div className="general">
        <h5>Thông tin chung</h5>
        <ul>
          <li>Giới thiệu về công ti</li>
          <li>Tin tuyển dụng</li>
          <li>Liên hệ-Góp ý</li>
          <li> Tin tức</li>
        </ul>
      </div>
      <div className="branch">
        <h5>Địa chỉ</h5>
        <ul>
          <li>123 BA,Quang Trung, Đà Nẵng</li>
          <li>134 BA,Quang Trung, Đà Nẵng</li>
          <li>145 BA,Quang Trung, Đà Nẵng</li>
        </ul>
      </div>
      <div className="contact">
        <h5>Liên lạc</h5>
        <i class="bi bi-facebook"></i>
        <i class="bi bi-twitter"></i>
        <i class="bi bi-envelope"></i>
        <i class="bi bi-youtube"></i>
      </div>
    </div>
  );
}
