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
      <ul className="right hide-on-med-and-down">
        <li>
          <Link to="/profile">Welcome {user.name}</Link>
        </li>
        <li>
          <a href="!#" onClick={this.onLogOutClick}>
            Log Out
          </a>
        </li>
      </ul>
    );

    const sideAuthLink = (
      <li>
        <a href="!#" onClick={this.onLogOutClick}>
          Log Out
        </a>
      </li>
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
          <div className="nav-wrapper container">
            <Link to="/" className="brand-logo">
              Project
            </Link>
            <Link to="!#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </Link>
            {isAuthenticated ? authLink : guestLink}
            <ul
              className="left hide-on-med-and-down"
              style={{ marginLeft: "150px", marginTop: "6px" }}
            >
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
          {isAuthenticated ? (
            sideAuthLink
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
