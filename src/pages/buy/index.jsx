import React ,{useState}from 'react'
import './styles.scss'
import { Form, Button, Col,Row } from "react-bootstrap";
import Navbar from '../../components/navbar'
const Buynow =()=>{
    const [name, setName] = useState();
    const [address, setAddress] = useState();
    const [email, setEmail ]= useState();
    const [phone, setPhone ]= useState();
    const img ='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxJxjlYiHfkoRyujrOtE2yHNyfdn74qel_PA&usqp=CAU'
    const handleChange = (val, field) => {
        if (field === "name") {
          setName(val);
        }
        if (field === "address") {
          setAddress(val);
        } 
        if (field === "email") {
          setEmail(val);}
          if (field === "phone") {
            setPhone(val);}
      };
    return(
        <div className='buyContainer'>
            <Navbar/>
            <div className="content">
            <span className="text-danger" >Để đặt hàng</span><span>, quý khách vui lòng kiểm tra sản phẩm, số lượng, giá, màu sắc và điền thông tin địa chỉ đúng</span>
        <div className='d-flex justify-content-between mt-2'>
            <img src={img} alt="" width={80} height={80} /> 
            <p>ten</p>
            <div>
                <Button variant="outline-info" className="mb-1 mx-1"><i class="fa-solid fa-circle-minus" ></i></Button>
                <input type="number" className='inp' />
                <Button variant="outline-info" className="mb-1 mx-1"><i class="fa-solid fa-circle-plus"></i></Button>

            </div>
        </div>
        <div className="form">
        <Form >
          <Form.Group
            as={Row}
            className="mb-3 d-flex justify-content-between"
            controlId="formPlaintextEmail"
          >
            <Form.Label column sm="3" className="mx">
              Họ Tên Khách Hàng
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
              Email
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
              Số Điện Thoại
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
             Địa chỉ
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
               as="textarea"  row={3  }
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) =>
                  handleChange(e.target.value, "address")
                }
              />
            </Col>
          </Form.Group>
          <div className="d-flex justify-content-center mt-4">
            <Button
              variant="secondary"
              className="muahang"
            //   onClick={hanldeRegister}
            >
              Mua Hàng
            </Button>{" "}
          </div>
        </Form>
        </div>
        </div>
        </div>
    )
}
export default Buynow