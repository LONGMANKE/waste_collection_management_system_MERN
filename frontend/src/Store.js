import { legacy_createStore,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer, userReducer,  } from "./reducers/userReducer";
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productReviewsReducer, productsReducer, reviewReducer } from "./reducers/productReducer";

const reducer = combineReducers({  
    user: userReducer, 
    forgotPassword: forgotPasswordReducer,
    profile: profileReducer,
    users: allUsersReducer,
   userDetails: userDetailsReducer,
  products: productsReducer,
  productDetails: productDetailsReducer,

    
  
  
  });

  let initialState = {

  };

  const middleware = [thunk];

  const store = legacy_createStore( 
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  export default store;     