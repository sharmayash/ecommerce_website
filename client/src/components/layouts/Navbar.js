import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logOutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogOutClick = e => {
    e.preventDefault();
    this.props.logOutUser();
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLink = (
      <div>
        <ul className="right hide-on-med-and-down">
          <li>
            <Link to="/profile">
              <i className="material-icons">account_box</i>
            </Link>
          </li>
          <li>
            <Link to="/wishlist">Wishlist</Link>
          </li>
          <li>
            <Link to="/sell">Sell</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <a href="!#" onClick={this.onLogOutClick}>
              Log Out
            </a>
          </li>

          {/* <a
            href="!"
            className="dropdown-trigger btn z-depth-0 transparent"
            data-target="dropdownAll"
          > More
            <i className="material-icons right">arrow_drop_down</i>
          </a> */}

          {/* <ul id="dropdownAll" className="dropdown-content"> */}
          {/* </ul> */}
        </ul>
      </div>
    );

    const guestLink = (
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/login">Log In</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="blue-grey darken-2">
          <div className="nav-wrapper container-fluid navBar">
            <Link to="/" className="brand-logo">
              Project
            </Link>
            <Link to="!#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            {isAuthenticated ? authLink : guestLink}
            <ul
              className="left hide-on-med-and-down"
              style={{ marginLeft: "150px" }}
            >
              <li>
                <Link to="/category/phones">
                  <i className="material-icons">phone_iphone</i>
                </Link>
              </li>
              <li>
                <Link to="/category/laptops">
                  <i className="material-icons">laptop</i>
                </Link>
              </li>
              <li>
                <Link to="/category/watches">
                  <i className="material-icons">watch</i>
                </Link>
              </li>
              <li>
                <Link to="/category/games">
                  <i className="material-icons">games</i>
                </Link>
              </li>
              <li>
                <Link to="/category/headset">
                  <i className="material-icons">headset</i>
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <ul id="slide-out" className="sidenav blue-grey darken-2">
          <li>
            <div className="user-view">
              <div className="background img1" />
              <Link to="/profile">
                <img className="circle img2" alt="" />
              </Link>
              <Link to="/profile">
                <span className="white-text name">Welcome {user.name}</span>
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
              <i className="material-icons right">phone_iphone</i>
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/laptops">
              Laptops
              <i className="material-icons right">laptop</i>
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/watches">
              Smart Watches
              <i className="material-icons right">watch</i>
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/gmaes">
              Games
              <i className="material-icons right">games</i>
            </Link>
          </li>
          <li>
            <Link className="waves-effect" to="/headset">
              Headsets
              <i className="material-icons right">headset</i>
            </Link>
          </li>
          <li>
            <div className="divider" />
          </li>
          {isAuthenticated ? (
            <div>
              <li>
                <Link to="/sell">Sell</Link>
              </li>
              <li>
                <a href="!#" onClick={this.onLogOutClick}>
                  Log Out
                </a>
              </li>
            </div>
          ) : (
            <div>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/register">Sign Up</Link>
              </li>
            </div>
          )}
          <li>
            <div className="divider" />
          </li>
        </ul>
      </div>
    );
  }
}

Navbar.propTypes = {
  logOutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logOutUser }
)(Navbar);
