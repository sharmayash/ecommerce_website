import {
  GET_ALL_PRODUCTS,
  PROFILE_LOADING,
  PRODUCT_ADD,
  GET_A_PRODUCT,
  // ADD_QUANTITY,
  PRODUCT_DELETE
} from "../actions/types";

const initialState = {
  products: [],
  product: {},
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_ADD:
      return {
        ...state,
        products: [action.payload, ...state.products]
      };
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        loading: false
      };
    case GET_A_PRODUCT:
      return {
        ...state,
        product: action.payload,
        loading: false
      };
    // case ADD_QUANTITY:
    //   state.product.quantity = action.payload;
    //   return state;
    case PRODUCT_DELETE:
      return {
        ...state,
        products: state.products.filter(item => item._id !== action.payload)
      };
    default:
      return state;
  }
};
