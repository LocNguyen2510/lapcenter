import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import "./styles.scss";
import { Button, Spinner } from "react-bootstrap";
import Footer from "../../footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ViewCard from "../../components/viewCard";
// import { useEffect, useState } from "react";
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ProductDetail() {
  const { state } = useLocation();
  const [product, setProduct] = useState();
  const [image, setImage] = useState("");
  const location=useLocation();
  const [productsBrand, setProductsBrand] = useState();
  const [loading, setLoading] = useState(true);
  console.log("productId", state.id);
  console.log("productBrand:", state.brand);

  const getProductId = () => {
    setLoading(true);
    axios
      .get(
        `https://lap-center-v1.herokuapp.com/api/product/getProductbyId/${state.id}`
      )
      .then(function (response) {
        // handle success
        setLoading(false);
        const data = response.data.response;
        console.log("SUCCESS:", data);
        setProduct(data);
        setImage(data.images[0]);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Something went wrong!!!");
        console.error("ERROR:", error);
      });
  };

  const getProductsBrand = () => {
    setLoading(true);
    axios
      .get("https://lap-center.herokuapp.com/api/product", {
        params: {
          productBrand: state.brand,
        },
      })
      .then(function (response) {
        setLoading(false);
        // handle success
        console.log("SUCCESS 111111:", response.data);
        setProductsBrand(response.data.products);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Something went wrong!!!");
        console.error("ERROR:", error);
      });
  };

  useEffect(() => {
    getProductId();
    getProductsBrand();
    console.log("ham nay chi chay 1 lan duy nhat");
  }, [location]);
  return (
    <div>
      <Navbar />
      <div className="ProductDetailContainer">
        {!loading ? (
          <div>
            <div className="content">
              <div className="title">
                <h3>{product?.name}</h3>
                <span>T??nh tr???ng : C??n H??ng</span>
                <span className="mx-4">B???o h??nh: 24 th??ng</span>
                <div>
                  <hr />
                  <div className="info row">
                    <div className="productImg col">
                      <img src={image} alt="" className="images" />{" "}
                      <div className="text-center ">
                        {product?.images.length > 0 &&
                          product?.images.map((item, idx) => (
                            <img
                              src={item}
                              alt=""
                              className="imagesSmall mx-2"
                              key={idx}
                              onClick={() => setImage(item)}
                            />
                          ))}

                        {/* //   product?.images.length > 0 && product?.images.map((item,idx)=>(
                      
                  //   <img
                  //     src={item}
                  //     alt=""
                  //     className="imagesSmall mx-2" key={idx} onClick={()=>setImage(item)}
                  //   />
                  //   ))
                  // } */}
                      </div>
                    </div>

                    <div className="price col">
                      <span className="price1">Gi?? b??n:</span>{" "}
                      <span className="price2">{product?.price}</span>
                      <div className="discount">Khuy???n m??i - Qu?? t???ng</div>
                      <div className="discountInfo">Th??ng tin qu?? t???ng</div>
                      <div className="text-center">
                        <Button className="my-4 bg-danger">MUA NGAY</Button>
                        <br />
                        <span>G???I NGAY:</span>
                        <span className="text-danger mx-2 h4">
                          2323 23232 232
                        </span>
                        ????? gi??? h??ng
                      </div>
                    </div>

                    <div className="contact col">
                      <b>??i???n tho???i t?? v???n - ?????t h??ng</b>
                      <ul className="text-black">
                        <li>V??n A:12348723</li>
                        <li>V??n B:12387232</li>
                        <li>V??n C:16568723</li>
                      </ul>
                      <b>?????a ch??? mua h??ng</b>
                      <ul>
                        <li>123 BA,Quang Trung, ???? N???ng</li>
                        <li>134 BA,Quang Trung, ???? N???ng</li>
                        <li>145 BA,Quang Trung, ???? N???ng</li>
                      </ul>
                    </div>
                  </div>

                  <table class="table my-5 ">
                    <thead>
                      <tr class="table-primary">
                        <th scope="col">Ph???n c???ng</th>
                        <th scope="col">Th??ng s?? k?? thu???t</th>
                      </tr>
                    </thead>
                    <tbody className="  table-success table-striped">
                      <tr>
                        <td>Model</td>
                        <td>{product?.model}</td>
                      </tr>
                      <tr>
                        <td>CPU</td>
                        <td>{product?.cpu}</td>
                      </tr>
                      <tr>
                        <td>RAM</td>
                        <td>{product?.ram}</td>
                      </tr>
                      <tr>
                        <td>M??n h??nh</td>
                        <td>{product?.monitor}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <b className="text-warning">S???n Ph???m C??ng Th????ng Hi???u</b>
              </div>
            </div>
            <Carousel responsive={responsive}>
              {productsBrand?.length > 0 &&
                productsBrand?.map((item, index) => (
                  <ViewCard product={item} key={index} />
                ))}
            </Carousel>
            <Footer />
          </div>
        ) : (
          <div className="spin ">
            <Spinner animation="grow" variant="danger" />
            <Spinner animation="grow" variant="warning" />
            <Spinner animation="grow" variant="info" />
          </div>
        )}
      </div>
    </div>
  );
}
