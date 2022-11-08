import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"


const ServiceCard= ({service}) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1",
    activeColor:" #008710",
    size: window.innerWidth <600 ? 20 :25,
    value: service.ratings,
    isHalf: true,
  };
  return (
    <Link className="ServiceCard" to={`/service/${service._id}`}>
      <img src={service.images[0].url} alt={service.name} />
      <p>{service.name}</p>
      <div>

        <ReactStars {...options} />{" "}
        <span className="ServiceCardSpan">
         
          ({service.numOfReviews}Reviews) 
        </span> 
      </div>
      <span>{`ksh ${service.price}`}</span>
    </Link>
  );
};

export default ServiceCard;  