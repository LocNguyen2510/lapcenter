import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import ProductDetail from './productDetail';
import Footer from './footer';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/home';
import About from './pages/about';
import Login from './pages/login';
import Register from './register';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="productDetail" element={<ProductDetail />} />
       


      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();