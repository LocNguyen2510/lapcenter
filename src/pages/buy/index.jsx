import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Form, Button, Col, Row, Spinner } from "react-bootstrap";
import axios from "axios";
import Navbar from "../../components/navbar";
import { useLocation } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
const Buynow = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const { state } = useLocation();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [quantity, setQuantity] = useState(1);
  const [totalprice, setTotalPrice] = useState(0);
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [message, setMessage] = useState();

  console.log("state ID :", state.id);
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
  const handleOrderProduct = () => {
    setLoading(true)
    axios
      .post("https://lap-center.herokuapp.com/api/order/addOrder", {
        customerName: name,
        phone: phone,
        email: email,
        address: address,
        productName: product?.name,
        productBrand: product?.brand,
        quantity: quantity,
        orderStatus: 1,
      })
      .then((res) => {
        setModalConfirm(true)
        setMessage("Đặt hàng thành công")
        setLoading(false)
      })
      .catch((err) => {
        setModalConfirm(true)
        setMessage("Đặt hàng thất bại")
        setLoading(false)
      })
      setModalShow(false)
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

      {!loading ? (
        <div className="content">
          <span className="text-danger">Để đặt hàng</span>
          <span>
            , quý khách vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và
            điền thông tin địa chỉ đúng
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
                  onClick={() => setModalShow(true)}
                  //   onClick={hanldeRegister}
                >
                  Mua Hàng
                </Button>{" "}
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <div className="spin1">
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
        </div>
      )}
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-danger"
          >
            Xác nhận thông tin
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex ">
            <div className="mr-3">
              <img src={image} alt="" height={200} width={200} />
            </div>
            <div>
              <div>
                <h5 className="text-warning">Thông Tin Sản Phẩm :</h5>
                <span>Tên Sản Phẩm: </span>
                <span className="fw-bold mx-2">{product?.name}</span>
                <br />
                <span>Hãng: </span>
                <span className="fw-bold mx-2">{product?.brand}</span>
                <br />
                <span>Số Lượng: </span>
                <span className="fw-bold mx-2">{quantity}</span>
                <br />
                <span>Tổng Tiền: </span>
                <span className="fw-bold mx-2">{totalprice}VND</span>
                <br />
              </div>
              <div className="my-3">
                <h5 className="text-warning">Thông Tin Khách Hàng :</h5>
                <span>Tên Khách Hàng: </span>
                <span className="fw-bold mx-2">{name}</span>
                <br />

                <span>Số Điện Thoại: </span>
                <span className="fw-bold mx-2">{phone}</span>
                <br />
                <span>Email: </span>
                <span className="fw-bold mx-2">{email}</span>
                <br />
                <span>Địa Chỉ: </span>
                <span className="fw-bold mx-2">{address}</span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleOrderProduct}>Xác Nhận</Button>
        </Modal.Footer>
      </Modal>
   
     <div>
   <Modal
   show={modalConfirm}
   onHide={() => setModalConfirm(false)}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Thông Báo Đặt Hàng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {message}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={()=>{setModalConfirm(false)}}>Close</Button>
      </Modal.Footer>
    </Modal></div>
    
    </div>
  );
};
export default Buynow;
