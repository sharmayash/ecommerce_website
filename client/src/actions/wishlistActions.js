import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING,
  GET_ERRORS,
  PRODUCT_ADD
} from "./types";

export const getWishes = () => dispatch => {
  dispatch(setProductsLoading());
  axios
    .get("/api/profile/wishlist")
    .then(res =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PRODUCTS,
        payload: null
      })
    );
};

export const addWish = productData => dispatch => {
  axios
    .post(`/api/profile/wishlist/${productData._id}`, productData)
    .then(res => {
      dispatch({
        type: PRODUCT_ADD,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// set products loading

export const setProductsLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
