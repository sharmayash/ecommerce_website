import React, { Component } from "react";

class Register extends Component {
  render() {
    return (
      <div className="register">
        <div className="container-fluid center">
          <h3>Sign up</h3>
          <p>Create Your Account.</p>
          <div className="row">
            <form action="POST" className="col s12 m12 l12">
              <div className="card z-depth-5 blue-grey darken-2">
                <div className="card-content white-text">
                  <div className="row section">
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Name"
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="PhnNo"
                        type="number"
                        name="phnNo"
                        placeholder="Phone No. (with country code)"
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="address"
                        type="text"
                        name="address"
                        placeholder="Address"
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                      />
                    </div>
                    <div className="input-field col s12 m6 l6">
                      <input
                        id="password2"
                        type="password"
                        name="password2"
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
