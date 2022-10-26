import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, } from "./reducers/userReducer";
import { newserviceReducer, newReviewReducer, serviceDetailsReducer, serviceReducer, serviceReviewsReducer, servicesReducer, reviewReducer } from "./reducers/serviceReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  users: allUsersReducer,
  userDetails: userDetailsReducer,
  services: servicesReducer,
  serviceDetails: serviceDetailsReducer,
  service: serviceReducer,
  newReview: newReviewReducer,
  cart: cartReducer,
  




});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shipping Info")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};


const middleware = [thunk];

const store = legacy_createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;     