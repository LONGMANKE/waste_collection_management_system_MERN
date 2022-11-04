import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import ServiceCard from "./ServiceCard.js";
import MetaData from "../layout/MetaData";
import { getService } from "../../actions/serviceAction";
import { useDispatch, useSelector } from "react-redux"
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading,services, error } = useSelector((state) => state.services);

  useEffect(() => { 
    if (error) { 
      
      return alert.error(error);
      
    }
    dispatch(getService());
  },
    [dispatch, error, alert]);

  return (
    <Fragment> 

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="WASTE CMS" />
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
