import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt="ssa" />
      <div>
        <Link to={`/service/${item.service}`}>{item.name}</Link>
        <span>{`Price: KSH${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.service)}>Remove</p>
      </div>
    </div>
  );
};

export default CartItemCard;