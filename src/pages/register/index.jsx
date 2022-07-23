import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import iconHome from "../../assets/imgs/iconHome.png"


export default function Register() {
  let navigate = useNavigate();

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail ]= useState();
  const [phone, setPhone ]= useState();


  // const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "password") {
      setPassword(val);
    } 
    if (field === "email") {
      setEmail(val);}
      if (field === "phone") {
        setPhone(val);}
  };
  const handleOnRegister = () => {
    alert("tạo tài khoản thành công");
    navigate("/login");
  };
  const hanldeRegister=()=>{
    const url='https://lap-center-v1.herokuapp.com/api/register'
    // if(name===fakeAccount.name && password===fakeAccount.password){
    //   console.log("DANG NHAP THANH CONG!");
    //   navigate('/')

    // }
    // else{
    //   console.log("DANG NHAP KHONG THANH CONG!")
    //   alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")
    // }
    axios.post(url  , {
      name: name,
      email:email,
      phone:phone,
      password: password
    })
    .then(function (response) {
      console.log("SUCCESS:",response.data);
      navigate('/login')

    })
    .catch(function (error) {
      console.log("ERROR:",error);
      alert("Lỗi đăng kí, vui lòng thử lại!!!")

    });
  }
  return (
    <div className="registerContainer">
         <img src={iconHome} alt="" className='iconHome' width={45} height={45} title='Trang Chủ' onClick={()=> navigate('/')} />
      {/* <Navbar /> */}
      <div className="formregister">
        <Form>
          <h2> ĐĂNG KÝ</h2>
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="3" className="mx">
              Customer Name
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Customer Name"
                value={name}
                onChange={(e) => handleChange(e.target.value, "name")}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="2" className="mx">
              Email
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder=" Email"
                value={email}
                onChange={(e) => handleChange(e.target.value, "email")}
              />
            </Col>
          </Form.Group>

          <Form.Group
            as={Row}
            className="mb-3  d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              phone
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => handleChange(e.target.value, "phone")}
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
                onChange={(e) =>
                  handleChange(e.target.value, "password")
                }
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              className="DK"
              onClick={hanldeRegister}
            >
              Đăng Ký
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
