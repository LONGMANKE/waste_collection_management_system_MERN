
import React, { Fragment, useEffect, useState } from "react";
import "./Services.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getService } from "../../actions/serviceAction";
import Loader from "../layout/Loader/Loader";
import ServiceCard from "../Home/ServiceCard";
import MetaData from "../../component/layout/MetaData"
import Pagination from "react-js-pagination"
import { Slider } from '@mui/material';
import { Typography } from '@mui/material';
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";


const categories = [
    "Complete",
    "Moderate",
    "Normal",
];

const Services = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { keyword } = useParams();

    const [currentPage, setcurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 1000]);
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);
    const { loading, services, error, servicesCount, resultPerPage, filteredServicesCount } = useSelector((state) => state.services);



    const setCurrentPageNo = (e) => {
        setcurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredServicesCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        dispatch(getService(keyword, currentPage, price, category, ratings))
    }, [dispatch, error, keyword, currentPage, price, category, ratings, alert]);




    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="SERVICES -- WASTE" />
                    <h2 className="servicesHeading">SERVICES</h2>

                    <div className="services">
                        {services &&
                            services.map((service) => (
                                <ServiceCard key={service._id} service={service} />
                            ))}
                    </div>


                    <div className="filterBox">
                        <Typography>Price</Typography>
                       <div className="dd"><Slider 
                            value={price}
                            onChange={priceHandler}
                            // valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={1000}
                        /></div> 
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>

                        <fieldset>
                            <Typography component="legend">Ratings Above</Typography>
                            <Slider
                                value={ratings}
                                onChange={(e, newRating) => {
                                    setRatings(newRating);
                                }}
                                aria-labelledby="continuous-slider"
                                valueLabelDisplay="auto"
                                min={0}
                                max={5}
                            />
                        </fieldset>
                    </div>

                    {resultPerPage < count && (
                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={servicesCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}
                </Fragment>
            )}
        </Fragment>
    )
}

export default Services 