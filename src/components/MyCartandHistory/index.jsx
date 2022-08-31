import React from "react";
import { useNavigate } from "react-router-dom";
import iconCart from "../../assets/imgs/cart.png";
import iconHistory from "../../assets/imgs/history.png";
import "./styles.scss";

const MyCart = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="myCart" onClick={()=>navigate('/mycarts')}>
        <img src={iconCart} width={32} />
      </div>
      <div className="myHistory "onClick={()=>navigate('/mycarts')}>
        <img src={iconHistory} width={32} />
      </div>
    </div>
  );
};

export default MyCart;
