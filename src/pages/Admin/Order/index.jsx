import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/navbar";
import "./styles.scss";
import iconEye from "../../../assets/imgs/eye.png";
import iconDelete from "../../../assets/imgs/delete.png";
import Card from "../../../components/card";
import { Button, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

const fakedata = [
  {
    _id: "6257c89d462518002330074f",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-04-14T07:09:17.158Z",
    updatedAt: "2022-04-14T07:09:17.158Z",
    __v: 0,
  },
  {
    _id: "6298ba34505b90002306d2e3",
    userId: "617d08a5ad12171f2c494d8c",
    productId: "60c07aaea1364c3894ac0b51",
    productName: "LAPTOP ACER NITRO 5 AN515-45-R0B6",
    productBrand: "ACER",
    image: "https://philong.com.vn/media/product/24366-5.jpg",
    price: 32990000,
    createdAt: "2022-06-02T13:25:08.172Z",
    updatedAt: "2022-06-02T13:25:08.172Z",
    __v: 0,
  },
];
const Orders = () => {
  const navigate = useNavigate();
  const customerName = localStorage.getItem("customerName");
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = React.useState(false);
  const [loading, setLoading] = useState(false);
  const [dataItem, setDataItem] = useState();
  const [message, setMessage] = useState();
  const [modalConfirm, setModalConfirm] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = useState();
  const fetchAPI = () => {
    setLoading(true);
    axios
      .get(`https://lap-center.herokuapp.com/api/order`)
      .then(function (response) {
        // handle success
        const data = response.data.orders;
        console.log("Order: ", data);
        setData(data);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  const handleChooseItem = (item) => {
    console.log("ITEM: ", item);
    setDataItem(item);
    setModalShow(true);

    setSelectedStatus(item.orderStatus);
  };
  const handleDelete = (orderId) => {
    setLoading(true);
    axios
      .delete(
        `https://lap-center.herokuapp.com/api/order/removeOrder/${orderId}`
      )
      .then(function (response) {
        setModalConfirm(true);
        setMessage("Xóa đơn hàng thành công!");

        // handle success
        setLoading(false);
        fetchAPI();
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        setModalConfirm(true);
        setMessage("Xóa đơn hàng không thành công!");
      });
  };
  const handleShowOrderStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "Vừa đặt hàng";
    }
    if (orderStatus === 2) {
      return "Đang giao hàng";
    }
    if (orderStatus === 3) {
      return "Đã nhận hàng";
    }
    if (orderStatus === 4) {
      return "Hoàn trả hàng";
    }
  };
  const handleSelectChange = (event) => {
    setSelectedStatus(parseInt(event.target.value));
    console.log(parseInt(event.target.value));
  };
  const handleShowColorOrderStatus = (orderStatus) => {
    if (orderStatus === 1) {
      return "text-success";
    }
    if (orderStatus === 2) {
      return "text-primary";
    }
    if (orderStatus === 3) {
      return "text-info";
    }
    if (orderStatus === 4) {
      return "text-dager";
    }
  };
  const handleUpdateOrderStatus = () => {
    // setOpen(false);
    setLoading(true);
    axios
      .patch(
        ` https:lap-center.herokuapp.com/api/order/editOrderStatus/${dataItem._id}`,
        {
          orderStatus: selectedStatus,
        }
      )
      .then(function (response) {
        setModalConfirm(true);
        setLoading(false);
        setModalShow(false);
        setMessage("Cập nhật trạng thái đơn hàng thành công!");
        console.log(response);
        fetchAPI();
      })
      .catch(function (error) {
        setModalConfirm(true);
        setModalShow(false);
        setLoading(false);
        setMessage("Cập nhật trạng thái đơn hàng không thành công!");
        console.log(error);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);
  return (
    <>
      <Navbar />
      {!loading ? (
        <div className="containerOrders">
          <div className="title">
            <span className="h3">Quản Lí Đơn Hàng</span>{" "}
          </div>
          <div className="d-flex tb-header rounded-top fw-bold text-light ">
            <p className="tbh-name">Tên khách hàng</p>
            <p className="tbh-brand" style={{ textAlign: "center" }}>
              Tên sản phẩm
            </p>
            <p className="tbh-quatity">Số lượng</p>
            <p className="tbh-price">Trạng thái</p>
            <p className="tbh-actions">Hành động</p>
          </div>
          {data.map((item) => (
            <div className="d-flex tb-body fw-bold border-top-0">
              <p className="tbh-name mt-4">{item.customerName}</p>
              <p className="tbh-brand mt-4">{item.productName}</p>
              <p className="tbh-quatity mt-4">{item.quantity}</p>

              <p
                className={`tbh-price mt-4 ${handleShowColorOrderStatus(
                  item.orderStatus
                )}`}
              >
                {handleShowOrderStatus(item.orderStatus)}
              </p>
              <div className="tbh-actions tbb-actions">
                <div className="tbbcart d-flex ">
                  <div className="bg-icon">
                    <img
                      className="iconcart mt-2 "
                      onClick={() => handleChooseItem(item)}
                      src={iconEye}
                    ></img>
                  </div>
                  <div className="bg-icon">
                    <img
                      className="iconcart mt-2"
                      onClick={() => handleDelete(item._id)}
                      src={iconDelete}
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {data.length == 0 && (
            <div className="text-center mt-2">
              <p>Không có sản phẩm nào trong giỏ hàng!</p>
            </div>
          )}
        </div>
      ) : (
        <div className="spin ">
          <Spinner animation="grow" variant="danger" />
          <Spinner animation="grow" variant="warning" />
          <Spinner animation="grow" variant="info" />
        </div>
      )}

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        backdrop="static"
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
          <div className="">
            <div className="info-check d-flex ">
              <p>Tên khách hàng:</p>
              <span className="fw-bold">{dataItem?.customerName}</span>
            </div>
            <div className="info-check d-flex">
              <p>Tên sản phẩm:</p>
              <span className="fw-bold">{dataItem?.productName}</span>
            </div>
            <div className="info-check d-flex">
              <p>Hãng:</p>
              <span className="fw-bold">{dataItem?.productBrand}</span>
            </div>
            <div className="info-check d-flex">
              <p>Số lượng:</p>
              <span className="fw-bold"> {dataItem?.quantity}</span>
            </div>
            <div className="info-check d-flex">
              <p>Số điện thoại:</p>
              <span className="fw-bold">{dataItem?.phone}</span>
            </div>
            <div className="info-check d-flex">
              <p>Địa chỉ:</p>
              <span className="fw-bold">{dataItem?.address}</span>
            </div>
            <div className="info-check d-flex">
              <p>Trạng thái đơn hàng:</p>
              <select
                value={selectedStatus}
                onChange={handleSelectChange}
                className="select-status"
              >
                <option value="1">Vừa đặt</option>
                <option value="2">Đang giao</option>
                <option value="3">Đã nhận</option>
                <option value="4">Gửi trả</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-light"
            onClick={() => handleUpdateOrderStatus()}
          >
            Cập nhật
          </Button>
          <Button className="btn-warning" onClick={() => null}>
            Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Orders;
