import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_LOCATION_INFO,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], locationInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.service === item.service
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.service === isItemExist.service ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.service !== action.payload),
      };

    case SAVE_LOCATION_INFO:
      return {
        ...state,
        locationInfo: action.payload,
      };

    default:
      return state;
  }
};