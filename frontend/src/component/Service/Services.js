
import React, { Fragment, useEffect, useState } from "react";
import "./Services.css"
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getService } from "../../actions/serviceAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import MetaData from "../../component/layout/MetaData"
import Pagination from "react-js-pagination"
import { Slider } from '@mui/material';
import { Typography } from '@mui/material';
import { useAlert } from "react-alert";

const categories = [
    "Laptop",
    "Footwear",
    "Bottom", 
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
];

const Products = ({ match }) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const [currentPage, setcurrentPage] = useState(1)
    const [price, setPrice] = useState([0, 11000]);
    const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
    const { loading, products, error,productsCount,resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

    const keyword = match.params.keyword;

    const setCurrentPageNo = (e) => {
        setcurrentPage(e);
    }
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    let count = filteredProductsCount;

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
          }

        dispatch(getService(keyword, currentPage, price, category, ratings))
    }, [dispatch,error, keyword, currentPage, price, category, ratings, alert]);




    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="PRODUCTS -- ECOMMERCE" />
                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>


                    <div className="filterBox">
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"
                            aria-labelledby="range-slider"
                            min={0}
                            max={11000}
                        />

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
                                totalItemsCount={productsCount}
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

export default Products 