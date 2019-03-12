import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  DELETE_WISH,
  DELETE_A_CART,
  QTY_UP,
  QTY_DOWN
} from "../actions/types";

const initialState = {
  profile: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case DELETE_WISH:
      return {
        ...state,
        profile: state.profile.wishlist.filter(
          item => item._id !== action.payload
        )
      };
    case DELETE_A_CART:
      return {
        ...state,
        profile: state.profile.cart.filter(item => item._id !== action.payload)
      };
    case QTY_UP:
      state.profile.cart.map(item => {
        if (item._id === action.Id) {
          item.quantity = action.payload;
        }
        return item;
      });
      return state;
    // case QTY_DOWN:
    //   return {
    //     ...state,
    //     profile: state.profile.cart.map(item => {
    //       if (item._id === action.Id) {
    //         item.quantity -= action.payload;
    //       }
    //       return item;
    //     })
    //   };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};
