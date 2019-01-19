import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    axios
      .post("/api/users/register", newUser)
      .then(this.props.history.push("/dashboard"))
      .catch(err => console.log(err));
  }

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

export default Register;
