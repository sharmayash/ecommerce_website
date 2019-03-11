import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  PRODUCT_LOADING,
  GET_ERRORS,
  PRODUCT_ADD,
  DELETE_A_CART,
  QTY_UP,
  QTY_DOWN
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

// increase quantity and decrease from inventory in cart

export const addQuantity = Id => dispatch => {
  axios
    .post(`/api/profile/cart/Q_UP/${Id}`)
    .then(res => {
      dispatch({
        type: QTY_UP,
        Id,
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


// increase quantity and decrease from inventory

// export const decreaseQuantity = Id => {
//   return {
//     type: QTY_DOWN,
//     Id,
//     payload: 1
//   };
// };

// set products loading

export const setProductsLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
