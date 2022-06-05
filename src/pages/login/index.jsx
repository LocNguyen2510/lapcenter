import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
const fakeAccount={username:"admin",password:"admin"}
export default function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
      console.log("USERNAME:", val);
    } else {
      setPassword(val);
      console.log("PASSWORD:", val);
    }
  };
  const handleOnLogin=() =>{
    if(username===fakeAccount.username && password === fakeAccount.password){
       console.log ("DANG NHAP THANH CONG");
       navigate('/')
    }else{
      console.log("DANG NHAP KHONG THANH CONG")
      alert("tên tài khoản hoặc mật khẩu không chính xác.vui lòng nhập lại!?")
    }
  }
    return (
    <div className="loginContainer">
      <Navbar />
      <div className="formLogin">
        <Form>
          <h2> ĐĂNG NHẬP</h2>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2" className="mx">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => handleChange(e.target.value, "username")}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3  d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={handleOnLogin}>Đăng Nhập</Button>{" "}
          </div>
         <div>
           <p className="newaccount" onClick={()=> navigate("/register")}> tạo tài khoản mới</p>
         </div>
        </Form>
      </div>
    </div>
  );
}
