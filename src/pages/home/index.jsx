import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import axios from "axios";
import Card from "../../components/card";
import { data } from "../../data";
import { Form, Button } from "react-bootstrap";
import "./styles.scss";
export default function Home() {
  const [list, setList] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const [brand, setBrand] = useState("");

  const [price, setPrice] = useState(0);

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
    axios
      .get("https://lap-center.herokuapp.com/api/product")
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

    // axios
    // .get("https://lap-center.herokuapp.com/api/product",{
    //   params: {
    //     productName: search,
    //     productBrand: val,
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
    // });
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
    axios
      .get("https://lap-center.herokuapp.com/api/product", {
        params: {
          productName: productName,
          productBrand: productBrand,
          orderByColumn: "price",
          orderByDirection: productPrice,
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
  // }
  return (
    <div className="homecontainer">
      <Navbar />
      <div className="content">
        <div className="menu_left">
          <Form.Label htmlFor="inputPassword5">tim kiem san pham</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="text"
              id="inputPassword5"
              value={search}
              onChange={(e) => {
                handChange(e.target.value);
              }}
              aria-describedby="passwordHelpBlock"
            />
            <Button variant="primary" onClick={onSubmitSearch}>
              Search
            </Button>
          </div>
          <div className="selectForm d-flex">
            <p>Hãng</p>
            <select
              className="selectBox  "
              value={brand}
              onChange={handleSelectChange}
            >
              <option selected value=""></option>
              <option value="Asus">ASUS</option>
              <option value="Dell">DELL</option>
              <option value="Acer">ACER</option>
              <option value="Lenovo">LENOVO</option>
            </select>
          </div>
          <div className="selectForm d-flex">
            <p>Giá</p>
            <select className="selectBox" value={price} onChange={sortPrice}>
              <option selected value=""></option>
              <option value="asc">Từ thấp đến cao</option>
              <option value="desc">Từ cao đến thấp</option>
            </select>
          </div>
        </div>
        <div className="d-flex flex-wrap list_product">
          {list.map((item) => (
            <Card product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
