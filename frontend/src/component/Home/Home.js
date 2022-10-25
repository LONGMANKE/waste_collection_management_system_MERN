import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import ServiceCard from "./ServiceCard.js";
import MetaData from "../layout/MetaData";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';




// const product = {
//   name: "blue tshirt",
//   images: [{ url: "https://5.imimg.com/data5/JH/SP/MY-33710583/men-s-blue-shirt-500x500.jpg" }],
//   price: "1000",
//   _id: "Simoo"
// }

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,services, error } = useSelector((state) => state.services);

  useEffect(() => { 
    if (error) { 
      
      return alert.error(error);
      
    }
    dispatch(getProduct());
  },
    [dispatch, error, alert]);

  return (
    <Fragment> 

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="LONGMANKE SHOP" />
          <div className="banner">
            <p>Welcome to Waste collection services</p>
            <h1>GET THE BEST SERVICES BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>
          <h2 className="homeHeading">Featured services</h2>

          <div className="container" id="container">

            {services &&
              services.map((service) =>
                <ServiceCard service={service} />
              )}
          </div>
        </Fragment>)}

    </Fragment>
 
  );

}

export default Home
