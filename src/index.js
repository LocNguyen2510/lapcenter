import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductDetail from './pages/productDetail';
import Buynow from './pages/buy';
import './index.css'

import { Link } from 'react-router-dom';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/pageNotFound';
import MyCarts from './pages/Cart';
import MyHistory from './pages/history';
import Orders from './pages/Admin/Order';
const root = ReactDOM.createRoot(document.getElementById('root'));
const isAdmin = localStorage.getItem("isAdmin");
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="buy/:productId" element={<Buynow />} />
        <Route path="/myCarts" element={<MyCarts />} />
        <Route path="/myHistory"element={<MyHistory />} />
        <Route path="/*"element={<PageNotFound />} />

{
  isAdmin === "true" && 
  <Route path="/Order"element={<Orders />} />
}

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();