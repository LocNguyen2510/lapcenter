import React, { useState } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Navbar from "../../components/navbar";
import axios from "axios";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import iconHome from "../../assets/imgs/iconHome.png"

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
  };
  const hanldeLogin = () => {
    // if(username===fakeAccount.username && password===fakeAccount.password){
    //   console.log("DANG NHAP THANH CONG!");
    //   navigate('/')

    // }
    // else{
    //   console.log("DANG NHAP KHONG THANH CONG!")
    //   alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")
    // }
    axios
      .post("https://lap-center.herokuapp.com/api/login", {
        username: username,
        password: password,
      })
      .then(function (response) {
        console.log("SUCCESS:", response.data);
        localStorage.setItem('customerName', response.data.userName)
        localStorage.setItem('accessToken', response.data.token)
        localStorage.setItem('userId', response.data.userId)
        navigate("/");
      })
      .catch(function (error) {
        console.log("ERROR", error);
        alert(
          "Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!"
        );
      });
  };
    return (
    <div className="loginContainer">
      {/* <Navbar /> */}
      <img src={iconHome} alt="" className='iconHome' width={45} height={45} title='Trang Chủ' onClick={()=> navigate('/')} />
      <div className="formLogin">
        <Form>
          <h2> ĐĂNG NHẬP</h2>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Col sm="12">
            <Form.Label >
              Tên hoặc Số Điện Thoại:
            </Form.Label>
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
            <Col sm="12">
            <Form.Label >
              Mật Khẩu:
            </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => handleChange(e.target.value, "password")}
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={hanldeLogin}>Đăng Nhập</Button>{" "}
          </div>
         <div>
           <p className="newaccount" onClick={()=> navigate("/register")}> tạo tài khoản mới</p>
         </div>
        </Form>
      </div>
    </div>
  );
}
