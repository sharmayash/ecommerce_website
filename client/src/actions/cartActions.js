import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING,
  GET_ERRORS,
  PRODUCT_ADD,
  DELETE_A_CART,
} from "./types";

export const getCartProducts = () => dispatch => {
  dispatch(setProductsLoading());
  axios
    .get("/api/profile/cart")
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

// add a product in cart

export const addCart = productData => dispatch => {
  axios
    .post(`/api/profile/cart/${productData._id}`, productData)
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

// delete an item from cart

export const deleteCart = Id => dispatch => {
  axios
    .delete(`/api/profile/cart/${Id}`)
    .then(res => {
      dispatch({
        type: DELETE_A_CART,
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
