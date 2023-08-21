import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer, } from "./reducers/userReducer";
import { newServiceReducer,serviceDetailsReducer, serviceReducer, serviceReviewsReducer, servicesReducer } from "./reducers/serviceReducer";
import { cartReducer } from "./reducers/cartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer, allOrdersReducer, orderReducer, allOrdersReducerCollector} from "./reducers/orderReducer";
import { newProductReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, newReviewReducer, reviewReducer } from "./reducers/productReducer";
const reducer = combineReducers({
  user: userReducer,
  forgotPassword: forgotPasswordReducer,
  profile: profileReducer,
  users: allUsersReducer,
  userDetails: userDetailsReducer,
  services: servicesReducer,
  serviceDetails: serviceDetailsReducer,
  service: serviceReducer,
  serviceReviews: serviceReviewsReducer,  
  newService: newServiceReducer,

  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  AllOrders:  allOrdersReducer,
  AllOrders1:allOrdersReducerCollector,
  order: orderReducer,
  
  newProduct: newProductReducer,
  products: productsReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  productReviews: productReviewsReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      locationInfo: localStorage.getItem("locationInfo")
      ? JSON.parse(localStorage.getItem("locationInfo"))
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