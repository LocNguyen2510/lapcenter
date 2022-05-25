import React from "react";
import { Form, Col, Row ,Button} from "react-bootstrap";
import Navbar from "../components/navbar";
import './styles.scss'
export default function Login() {
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
          <Button variant="secondary">Đăng Nhập</Button>{' '}
          </div>
        </Form>
      </div>
    </div>
  );
}
