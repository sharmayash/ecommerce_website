import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // set the token to all request to a page
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // delete auth token from local storage
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
