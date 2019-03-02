import {
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  DELETE_WISH
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
        profile: state.profile.wishlist.filter(item => item._id !== action.payload)
      };
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
};
