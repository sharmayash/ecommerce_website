import { combineReducers } from "redux";
import authReducer from './authReducers';
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import productReducer from "./productReducer";

export default combineReducers({
    auth: authReducer,
    profile: profileReducer,
    errors: errorReducer,
    product: productReducer
})