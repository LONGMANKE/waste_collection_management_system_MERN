import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_LOCATION_INFO,
} from "../constants/cartConstants";
import axios from "axios";

// Add to Cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/v1/service/${id}`);

  dispatch({
    type: ADD_TO_CART,
    payload: {
      service: data.service._id,
      name: data.service.name,
      price: data.service.price,
      image: data.service.images[0].url,
      stock: data.service.Stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART
export const removeItemsFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// SAVE SHIPPING INFO
export const saveLocationInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_LOCATION_INFO,
    payload: data,
  });

  localStorage.setItem("locationInfo", JSON.stringify(data));
};