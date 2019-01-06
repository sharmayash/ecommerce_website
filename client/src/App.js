import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";


//importing components
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Navbar from "./components/layouts/Navbar";

// importing css files
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
