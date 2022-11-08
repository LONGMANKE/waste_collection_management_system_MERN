import React, { Fragment, useEffect, useState } from 'react'
import "./ServiceDetails.css"
import { useSelector, useDispatch } from "react-redux"
import { newReview, clearErrors, getServiceDetails } from "../../actions/serviceAction"
import ReactStars from "react-rating-stars-component"
import ReviewCard from "./ReviewCard.js";
import Loader from '../layout/Loader/Loader';
import MetaData from "../layout/MetaData";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";

import { addItemsToCart } from "../../actions/cartActions";

import { 
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/serviceConstants";

const ServiceDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const {id } = useParams();

  const { service, loading, error } = useSelector(
    (state) => state.serviceDetails);

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const options = {
    size: "large",
    value: service.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (service.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;
 
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("serviceId", id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getServiceDetails(id));
  }, [dispatch,id, error, alert, reviewError, success]);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title={`${service.name} -- COLLECTION`} />
          <div className='ServiceDetails'>
            <div>
              {service.images && [service.images[0]].map((item, i) => (
                <img
                  className="CarouselImage"
                  key={i}
                  src={item.url}
                  alt={`${i} Slide`} 
                />)

              )
              }
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{service.name}</h2>
                <p>Service # {service._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({service.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`KSH ${service.price}`}</h1>
                <div className="detailsBlock-3-1">
                <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                    <button onClick={addToCartHandler}>
                      Add to Cart
                    </button>
                </div>
                <p>
                  Status:
                  <b className={service.Stock < 1 ? "redColor" : "greenColor"}>
                    {service.Stock < 1 ? "UnAvailable" : "Available"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{service.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                 Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea" 
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {service.reviews && service.reviews[0] ? (
            <div className="reviews">
              {service.reviews &&
                service.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>

  )
}


export default ServiceDetails

// import {
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Button,
// } from "@material-ui/core";
// import { Rating } from "@material-ui/lab";
// import { NEW_REVIEW_RESET } from "../../constants/ServiceConstants";

// const ServiceDetails = ({ match }) => {
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   const { Service, loading, error } = useSelector(
//     (state) => state.ServiceDetails
//   );

//   const { success, error: reviewError } = useSelector(
//     (state) => state.newReview
//   );

//   const options = {
//     size: "large",
//     value: Service.ratings,
//     readOnly: true,
//     precision: 0.5,
//   };

//   const [quantity, setQuantity] = useState(1);
//   const [open, setOpen] = useState(false);
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const increaseQuantity = () => {
//     if (Service.Stock <= quantity) return;

//     const qty = quantity + 1;
//     setQuantity(qty);
//   };

//   const decreaseQuantity = () => {
//     if (1 >= quantity) return;

//     const qty = quantity - 1;
//     setQuantity(qty);
//   };

//   const addToCartHandler = () => {
//     dispatch(addItemsToCart(match.params.id, quantity));
//     alert.success("Item Added To Cart");
//   };

//   const submitReviewToggle = () => {
//     open ? setOpen(false) : setOpen(true);
//   };

//   const reviewSubmitHandler = () => {
//     const myForm = new FormData();

//     myForm.set("rating", rating);
//     myForm.set("comment", comment);
//     myForm.set("ServiceId", match.params.id);

//     dispatch(newReview(myForm));

//     setOpen(false);
//   };

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     if (reviewError) {
//       alert.error(reviewError);
//       dispatch(clearErrors());
//     }

//     if (success) {
//       alert.success("Review Submitted Successfully");
//       dispatch({ type: NEW_REVIEW_RESET });
//     }
//     dispatch(getServiceDetails(match.params.id));
//   }, [dispatch, match.params.id, error, alert, reviewError, success]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <MetaData title={`${Service.name} -- ECOMMERCE`} />
//           <div className="ServiceDetails">
//             <div>
//               <Carousel>
//                 {Service.images &&
//                   Service.images.map((item, i) => (
//                     <img
//                       className="CarouselImage"
//                       key={i}
//                       src={item.url}
//                       alt={`${i} Slide`}
//                     />
//                   ))}
//               </Carousel>
//             </div>

//             <div>
//               <div className="detailsBlock-1">
//                 <h2>{Service.name}</h2>
//                 <p>Service # {Service._id}</p>
//               </div>
//               <div className="detailsBlock-2">
//                 <Rating {...options} />
//                 <span className="detailsBlock-2-span">
//                   {" "}
//                   ({Service.numOfReviews} Reviews)
//                 </span>
//               </div>
//               <div className="detailsBlock-3">
//                 <h1>{`₹${Service.price}`}</h1>
//                 <div className="detailsBlock-3-1">
//                   <div className="detailsBlock-3-1-1">
//                     <button onClick={decreaseQuantity}>-</button>
//                     <input readOnly type="number" value={quantity} />
//                     <button onClick={increaseQuantity}>+</button>
//                   </div>
//                   <button
//                     disabled={Service.Stock < 1 ? true : false}
//                     onClick={addToCartHandler}
//                   >
//                     Add to Cart
//                   </button>
//                 </div>

//                 <p>
//                   Status:
//                   <b className={Service.Stock < 1 ? "redColor" : "greenColor"}>
//                     {Service.Stock < 1 ? "OutOfStock" : "InStock"}
//                   </b>
//                 </p>
//               </div>

//               <div className="detailsBlock-4">
//                 Description : <p>{Service.description}</p>
//               </div>

//               <button onClick={submitReviewToggle} className="submitReview">
//                 Submit Review
//               </button>
//             </div>
//           </div>

//           <h3 className="reviewsHeading">REVIEWS</h3>

//           <Dialog
//             aria-labelledby="simple-dialog-title"
//             open={open}
//             onClose={submitReviewToggle}
//           >
//             <DialogTitle>Submit Review</DialogTitle>
//             <DialogContent className="submitDialog">
//               <Rating
//                 onChange={(e) => setRating(e.target.value)}
//                 value={rating}
//                 size="large"
//               />

//               <textarea
//                 className="submitDialogTextArea"
//                 cols="30"
//                 rows="5"
//                 value={comment}
//                 onChange={(e) => setComment(e.target.value)}
//               ></textarea>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={submitReviewToggle} color="secondary">
//                 Cancel
//               </Button>
//               <Button onClick={reviewSubmitHandler} color="primary">
//                 Submit
//               </Button>
//             </DialogActions>
//           </Dialog>

//           {Service.reviews && Service.reviews[0] ? (
//             <div className="reviews">
//               {Service.reviews &&
//                 Service.reviews.map((review) => (
//                   <ReviewCard key={review._id} review={review} />
//                 ))}
//             </div>
//           ) : (
//             <p className="noReviews">No Reviews Yet</p>
//           )}
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default ServiceDetails;