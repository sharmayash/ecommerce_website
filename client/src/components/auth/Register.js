import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: ""
  };

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    return (
      <div className="register">
        <div className="container-fluid center">
          <h3>Sign up</h3>
          <p>Create Your Account.</p>
          <div className="row">
            <form
              onSubmit={this.onSubmit}
              method="POST"
              className="col s12 m12 l12"
            >
              <div className="card z-depth-5 blue-grey darken-2">
                <div className="card-content container white-text">
                  <div className="row section">
                    <div className="input-field col s12">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        placeholder="Name"
                      />
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        placeholder="Email"
                      />
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        placeholder="Password"
                      />
                    </div>
                    <div className="input-field col s12">
                      <input
                        id="password2"
                        type="password"
                        name="password2"
                        value={this.state.password2}
                        onChange={this.onChange}
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                </div>
                <div className="card-action">
                  <button
                    className="btn waves-effect waves-light z-depth-5 hoverable blue-grey darken-2"
                    type="submit"
                    name="action"
                  >
                    Sign Up
                    <i className="material-icons right">send</i>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
