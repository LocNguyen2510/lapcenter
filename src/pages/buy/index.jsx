import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useLocation } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
const Buynow = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const{ state }=useLocation();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [quantity, setQuantity] = useState(1);
  const [totalprice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  console.log("state ID :" ,state.id);
  const handleChange = (val, field) => {
    if (field === "name") {
      setName(val);
    }
    if (field === "address") {
      setAddress(val);
    }
    if (field === "email") {
      setEmail(val);
    }
    if (field === "phone") {
      setPhone(val);
    }
  };

  const handleChangeQuantity = (val) => {
    const value = parseInt(val);
    if (value < 1) {
      setQuantity(1);
      setTotalPrice(1 * product?.price);
    } else {
      setQuantity(val);
      setTotalPrice(val * product?.price);
    }
  };
  const handleUpOrDownQuantity = (method) => {
    if (method === "plus") {
      setQuantity(quantity + 1);
      setTotalPrice((quantity + 1) * product?.price);
    } else {
      if (quantity < 2) {
        setQuantity(1);
        setTotalPrice(1 * product?.price);
      } else {
        setQuantity(quantity - 1);
        setTotalPrice((quantity - 1) * product?.price);
      }
    }
  };
  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product/getProductById/${state?.id}`
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        const data = response.data.response;
        console.log("SUCCESS:", data);
        setProduct(data);
        setImage(data.images[0]);
        setTotalPrice(1 * data?.price);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Something went wrong!!!");
        console.error("ERROR:", error);
      });
  };
  useEffect(() => {
    getProductId();
  }, []);

  let checkInfo = false;
  if (!name || !phone || !email || !address) checkInfo = false;
  if (name && phone && email && address) checkInfo = true;

  return (
    <div className="buyContainer">
      <div className="navbar1">
      <Navbar />
      </div>
        
      {!loading?(
      <div className="content">
        <span className="text-danger">Để đặt hàng</span>
        <span>
          , quý khách vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và điền
          thông tin địa chỉ đúng
        </span>
        <div className="d-flex justify-content-between mt-2">
          <img src={image} alt="" width={100} height={100} />
          <p className="h5">{product?.name}</p>
          <div>
            <Button
              variant="outline-info"
              className="mb-1 mx-1"
              onClick={() => {
                handleUpOrDownQuantity("minus");
              }}
            >
              <i class="fa-solid fa-circle-minus"></i>
            </Button>
            <input
              type="number"
              className="inp"
              value={quantity}
              onChange={(e) => handleChangeQuantity(e.target.value)}
            />
            <Button
              variant="outline-info"
              className="mb-1 mx-1"
              onClick={() => {
                handleUpOrDownQuantity("plus");
              }}
            >
              <i class="fa-solid fa-circle-plus"></i>
            </Button>
          </div>
        </div>
        <div className="d-flex justify-content-between ">
          <div />
          <p className="fw-bold text-danger">{product?.price} VND</p>
        </div>
        <hr />
        <div className="d-flex justify-content-between ">
          <div className="fw-bold">Tổng tiền :</div>
          <h5 className="fw-bold text-warning">{totalprice} VND</h5>
        </div>
        <div className="form">
          <Form>
            <Form.Group
              as={Row}
              className="mb-3 d-flex justify-content-between"
              controlId="formPlaintextEmail"
            >
              <Form.Label column sm="3" className="mx">
                Họ Tên Khách Hàng :
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Name"
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
                Email :
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Email"
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
                Số Điện Thoại :
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder="Số Điện Thoại"
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
                Địa chỉ:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  as="textarea"
                  row={3}
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={(e) => handleChange(e.target.value, "address")}
                />
              </Col>
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button
                variant="secondary"
                className="muahang"
                disabled={!checkInfo}
                onClick={()=>setModalShow(true)}
                //   onClick={hanldeRegister}
              >
                Mua Hàng
              </Button>{" "}
            </div>
          </Form>
        </div>
      </div>):(
      <div className="spin1">
      <Spinner animation="grow" variant="danger" />
      <Spinner animation="grow" variant="warning" />
      <Spinner animation="grow" variant="info" />
    </div>)
        }
        <Modal
       show={modalShow}
       onHide={() => setModalShow(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Xác nhận thông tin
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex ">
          <div>
            <img src={image} alt="" height={200} width={200} />

          </div>
          <div>
          <div>
            <h5>Thông Tin Sản Phẩm</h5>
            <span className="fw-bold">Tên Sản Phẩm: </span><span>{product?.name}</span>
           <br />
            <span>Hãng: </span><span>{product?.brand}</span><br />
            <span>Số Lượng: </span><span>{product?.price}</span><br />
            <span>Tổng Tiền: </span><span>{product?.totalprice}</span><br />
          </div>
          <div>
          <h5>Thông Tin Khách Hàng</h5>
            <span>Tên Khách Hàng: </span><span>{product?.name}</span><br />

            <span>Số Điện Thoại: </span><span>{product?.phone}</span><br />
            <span>Email: </span><span>{product?.email}</span><br />
            <span>Địa Chỉ: </span><span>{product?.address}</span>
          </div>
          </div>
        </div>
   
      </Modal.Body>
      <Modal.Footer>
        <Button   onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
};
export default Buynow;
