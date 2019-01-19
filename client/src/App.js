import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authActions";
import store from "./store";

// importing css files
import "./App.css";

//importing components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";
import Dashboard from "./components/dashboard/Dashboard";

//check for tokens
if (localStorage.jwtToken) {
  //set auth token header
  setAuthToken(localStorage.jwtToken);
  //decode token and get user information
  const decoded = jwt_decode(localStorage.jwtToken);
  //set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // logout user
    store.dispatch(logOutUser());
    // Clear current profile
    //store.dispatch(clearCurrentProfile());
    // redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App blue-grey">
            <Navbar />
            <Route exact path="/dashboard" component={Dashboard} />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
