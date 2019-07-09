import axios from "axios";
import {
  GET_ALL_PRODUCTS,
  GET_A_PRODUCT,
  PRODUCT_LOADING,
  GET_ERRORS,
  PRODUCT_ADD,
  PRODUCT_DELETE,
  // ADD_QUANTITY
} from "./types";

// get all products
export const getProducts = () => dispatch => {
  dispatch(setProductsLoading());
  axios
    .get("/api/products")
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

// get a products
export const getProduct = id => dispatch => {
  dispatch(setProductsLoading());
  axios
    .get(`/api/products/${id}`)
    .then(res =>
      dispatch({
        type: GET_A_PRODUCT,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_A_PRODUCT,
        payload: null
      })
    );
};

// add new product

export const addProduct = (productData, history) => dispatch => {
  axios
    .post("/api/products", productData)
    .then(res => {
      dispatch({
        type: PRODUCT_ADD,
        payload: res.data
      });
      history.push("/");
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// delete a product

export const deleteProduct = productId => dispatch => {
  axios
    .delete(`/api/products/${productId}`)
    .then(res => {
      dispatch({
        type: PRODUCT_DELETE,
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
// increase quantity and decrease from inventory in product

// export const addProductQuantity = Id => dispatch => {
//   axios
//     .post(`/api/profile/product/quantity_up/${Id}`)
//     .then(res => {
//       dispatch({
//         type: ADD_QUANTITY,
//         payload: res.data,
//         Id: Id
//       });
//     })
//     .catch(err =>
//       dispatch({
//         type: GET_ERRORS,
//         payload: err.response.data
//       })
//     );
// };

// set products loading

export const setProductsLoading = () => {
  return {
    type: PRODUCT_LOADING
  };
};
