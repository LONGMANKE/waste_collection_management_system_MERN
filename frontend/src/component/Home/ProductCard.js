import React from "react";
import "./Home1.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"


const ProductCard= ({product}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor:" #008710",
    size: window.innerWidth <600 ? 20 :25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>

        <ReactStars {...options} />{" "}
        <span className="ProductCardSpan">
         
          ({product.numOfReviews}Reviews) 
        </span> 
      </div>
      <span>{`ksh ${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;  