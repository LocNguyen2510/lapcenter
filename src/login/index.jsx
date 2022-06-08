import React,{useState} from "react";
import { Form, Col, Row ,Button} from "react-bootstrap";
import Navbar from "../components/navbar";
import { useNavigate } from "react-router-dom";
import './styles.scss'
import axios from "axios";
const fakeAccount={username:"admin",password:"admin"}

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleChange = (val,field) => {
   
    if(field==="username"){
      setUsername(val)
      console.log("Username: ",val);
    }
    else{
      setPassword(val)
      console.log("Password: ",val);
    }
  };
  const hanldeLogin=()=>{
    const url='https://lap-center.herokuapp.com/api/login'
    // if(username===fakeAccount.username && password===fakeAccount.password){
    //   console.log("DANG NHAP THANH CONG!");
    //   navigate('/')

    // }
    // else{
    //   console.log("DANG NHAP KHONG THANH CONG!")
    //   alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")
    // }
    axios.post(url  , {
      username: username,
      password: password
    })
    .then(function (response) {
      console.log("SUCCESS:",response.data);
      navigate('/')

    })
    .catch(function (error) {
      console.log("ERROR:",error);
      alert("Tên tài khoản hoặc mật khẩu không chính xác. vui lòng thử lại!!!")

    });
  }
  return (
    <div className="logincontainer">
          <Navbar/>
      <div className="formlogin">
        <Form>
        <h2> ĐĂNG NHẬP</h2>
          <Form.Group as={Row} className="mb-3 d-flex justify-content-between" controlId="formPlaintextEmail">
            <Form.Label column sm="2" className="mx">
              Username
            </Form.Label>
            <Col sm="9">
              <Form.Control
               
             type="text"
             placeholder="Username"
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
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
          <Button variant="secondary" className="" onClick={hanldeLogin}>Đăng Nhập</Button>{' '}
          </div>
          <p className="create" onClick={()=>navigate("/register")}>tạo tài khoản mới</p>
        </Form>
      </div>
    </div>
  );
}
