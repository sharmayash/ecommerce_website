import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// importing css files
import "./App.css";

//importing components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from "./components/layouts/Navbar";
import Footer from './components/layouts/Footer';
import Dashboard from "./components/dashboard/Dashboard";


class App extends Component {
  render() {
    return (
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
    );
  }
}

export default App;
