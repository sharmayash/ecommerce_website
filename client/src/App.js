import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logOutUser } from "./actions/authActions";
import store from "./store";

// importing css files
import "./App.css";

// import private-route-component
import PrivateRoute from "./components/common/PrivateRoute";

//importing components
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProfileComponent from "./components/profile/ProfileComponent";
import EditProfile from "./components/profile/EditProfile";
import ShowProfile from "./components/profile/ShowProfile";
import ProductForm from "./components/products/ProductForm";
import WishListPage from "./components/wishlist/WishListPage";
import ShowAProduct from "./components/products/ShowAProduct";
import NotFound from "./components/common/NotFound";
import CartPage from "./components/cart/CartPage";
import ShowPhones from "./components/category/ShowPhones";

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
          <div className="App">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/category/:name" component={ShowPhones} />
              <Route path="/product/:id" component={ShowAProduct} />
              <PrivateRoute
                path="/create-profile"
                component={ProfileComponent}
              />
              <PrivateRoute path="/edit-profile" component={EditProfile} />
              <PrivateRoute path="/profile" component={ShowProfile} />
              <PrivateRoute exact path="/sell" component={ProductForm} />
              <PrivateRoute path="/wishlist" component={WishListPage} />
              <PrivateRoute path="/cart" component={CartPage} />
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="" component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
