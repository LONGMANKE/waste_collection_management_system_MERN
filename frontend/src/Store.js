import { legacy_createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

  
  let initialState = {
   
  };
  
  const middleware = [thunk];
  
  const store = legacy_createStore( 
    // reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
  export default store; 