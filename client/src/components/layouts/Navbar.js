import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="blue-grey darken-2">
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo">
              Project
            </Link>
            <Link to="!#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            <ul className="right hide-on-med-and-down">
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </ul>
            <ul className="left hide-on-med-and-down" style={{marginLeft: '200px'}}>
              <li>
                <Link to="/phones">SmartPhones</Link>
              </li>
              <li>
                <Link to="/laptops">Laptops</Link>
              </li>
              <li>
                <Link to="/watches">Smart Watches</Link>
              </li>
              <li>
                <Link to="/games">Games</Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav blue-grey darken-2">
          <li>
            <div className="user-view">
              <div className="background img1" />
              <Link to="/profile">
                <img className="circle img2" alt="dp"/>
              </Link>
              <Link to="/profile">
                <span className="white-text name">John Doe</span>
              </Link>
              <Link to="/profile">
                <span className="white-text email">jdandturk@gmail.com</span>
              </Link>
            </div>
          </li>
          <li>
            <a href="!#" className="subheader">
              Categories
            </a>
          </li>
          <li>
            <Link className="waves-effect" to="/phones">
              Smart Phones
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/laptops">
              Laptops
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/watches">
              Smart Watches
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/games">
              Games
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          <li>
            <Link to="/login">Log In</Link>
          </li>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <div className="divider" />
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
