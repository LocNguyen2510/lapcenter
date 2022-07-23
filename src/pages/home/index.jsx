import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import Card from "../../components/card";
import { data } from "../../data";
import { Form, Button, Spinner } from "react-bootstrap";
import ReactPaginate from "react-paginate";
import "./styles.scss";
export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [page, setPage] = useState(1);
  const customerName=localStorage.getItem('customerName')

  useEffect(() => {
    console.log("ham nay chay dau tien");
    fetchAxios();
  }, []);

  const fetchAPI = () => {
    fetch("https://reqres.in/api/users/", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const fetchAxios = () => {
    setLoading(true);
    axios
      .get(
        "https://lap-center.herokuapp.com/api/product?pageSize=6&pageNumber=1"
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESS:", response.data);
        setLoading(false);
        setList(response.data.products);
        setTotalPage(response.data.totalPage);
      })
      .catch(function (error) {
        // handle error
        console.error("ERROR:", error);
        setLoading(false);
        alert("Something went wrong!!!");
      });
  };

  const handChange = (val) => {
    console.log("value:", val);
    setSearch(val);
    handleCallApi();
    // setList(
    //   data.filter((item) =>
    //     item?.name?.toLowerCase()?.includes(val.toLowerCase())
    //   )
    // );
  };

  const onSubmitSearch = () => {
    handleCallApi(search, brand, price);
    // setList(
    //   data.filter((item) =>
    // //     item?.name?.toLowerCase()?.includes(search.toLowerCase())
    // //   )
    // // );
    // axios
    // .get("https://lap-center.herokuapp.com/api/product",{
    //   params: {
    //     productName: search,
    //     productBrand: brand,
    //     orderByColumn:'price',
    //     orderByDirection: price

    //   }
    // })
    // .then(function (response) {
    //   // handle success
    //   console.log("SUCCESS:", response.data);
    //   setList(response.data.products)
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.error("ERROR:", error);
    // };
  };

  const handleSelectChange = (e) => {
    const val = e.target.value;
    setBrand(val);
    handleCallApi(search, val, price);

    axios
      .get("https://lap-center.herokuapp.com/api/product", {
        params: {
          productName: search,
          productBrand: val,
          orderByColumn: "price",
          orderByDirection: price,
         
        },
      })
      .then(function (response) {
        // handle success
        console.log("SUCCESS:", response.data);
        setList(response.data.products);
      })
      .catch(function (error) {
        // handle error
        console.error("ERROR:", error);
      });
  };

  const sortPrice = (e) => {
    console.log("check");
    const val = e.target.value;
    setPrice(val);
    handleCallApi(search, brand, val);

    // console.log(typeof val);
    // if (val === "1") {
    //   setList(data.sort((a, b) => a.price - b.price));
    // } else {
    //   setList(data.sort((a, b) => b.price - a.price));
    // }
    // axios
    // .get("https://lap-center.herokuapp.com/api/product",{
    //   params: {
    //     productName: search,
    //     productBrand: brand,
    //     orderByColumn:'price',
    //     orderByDirection: val

    //   }
    // })
    // .then(function (response) {
    //   // handle success
    //   console.log("SUCCESS:", response.data);
    //   setList(response.data.products)
    // })
    // .catch(function (error) {
    //   // handle error
    //   console.error("ERROR:", error);
    // });
  };
  const handleCallApi = (productName, productBrand, productPrice) => {
    setLoading(true);
    axios
      .get("https://lap-center.herokuapp.com/api/product", {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: productPrice,
          pageSize: 6,
          pageNumber: page,
        },
      })
      .then(function (response) {
        // handle success
        console.log("SUCCESS:", response.data);
        setLoading(false);
        setList(response.data.products);
      })
      .catch(function (error) {
        setLoading(false);
        alert("Something went wrong!!!");
        // handle error
        console.error("ERROR:", error);
      });
  };
  const handleChangePage = (pageNumber) => {
    console.log("PAGE NUMBER ", pageNumber);
    setPage(pageNumber);
    console.log("PAGE NUMBER ", pageNumber);
    setLoading(true);
    axios
      .get(
        `https://lap-center.herokuapp.com/api/product?pageSize=6&pageNumber=${pageNumber}`
      )
      .then(function (response) {
        // handle success
        console.log("SUCCESS:", response.data);
        setLoading(false);
        setList(response.data.products);
        setTotalPage(response.data.totalPage);
      })
      .catch(function (error) {
        // handle error
        console.error("ERROR:", error);
        setLoading(false);
        alert("Something went wrong!!!");
      });
  };
  // }
  return (
    <div className="homecontainer">
      <Navbar />
      <div className="content">
        <div className="menu_top">
          <Form.Label htmlFor="inputPassword5"></Form.Label>
          <div className="inpsearch d-flex">
            <Form.Control
              type="text"
              id="inputPassword5"
              value={search}
              onChange={(e) => {
                handChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
            />
            <Button
              className="btnsearch"
              variant="primary"
              onClick={onSubmitSearch}
            >
              Tìm kiếm
            </Button>
          </div>
          <div className="selectForm d-flex">
            <p className="txtFilter">Hãng:</p>
            <select
              className="selectBox"
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value="">
                Tất Cả
              </option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm d-flex">
            <p className="txtFilter ">Giá:</p>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value="">
                Tất Cả
              </option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
          <div>{ 
          customerName &&
          <>
          <span className="text-success">Chào mừng,</span><span
          className="h5">{customerName}

          </span>
          </>}
          </div>
        </div>

        <div className="d-flex flex-wrap list_product">
          {!loading && list.length > 0 ? (
            list.map((item) => <Card product={item} key={item.id} />)
          ) : (
            <div className="spin ">
              <Spinner animation="grow" variant="danger" />
              <Spinner animation="grow" variant="warning" />
              <Spinner animation="grow" variant="info" />
            </div>
          )}
        </div>
      </div>
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={(e) => handleChangePage(e.selected + 1)}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
}
