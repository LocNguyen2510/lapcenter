import { Form, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const handleChange = (val, field) => {
    if (field === "username") {
      setUsername(val);
    }
    if (field === "password") {
      setPassword(val);
    } else {
      setConfirmPassword(val);
      console.log("CONFIRMPASSWORD:", val);
    }
  };
  const handleOnRegister = () => {
    alert("tạo tài khoản thành công");
    navigate("/login");
  };
  return (
    <div className="registerContainer">
      <Navbar />
      <div className="formregister">
        <Form>
          <h2> ĐĂNG KÝ</h2>
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
          <Form.Group
            as={Row}
            className="mb-3  d-flex justify-content-between"
            controlId="formPlaintextPassword"
          >
            <Form.Label column sm="2">
              Confirm Password
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="password"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) =>
                  handleChange(e.target.value, "confirmPassword")
                }
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              className="DK"
              onClick={handleOnRegister}
            >
              Đăng Ký
            </Button>{" "}
          </div>
        </Form>
      </div>
    </div>
  );
}
