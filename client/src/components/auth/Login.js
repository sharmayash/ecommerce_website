import React, { Component } from "react";

class Login extends Component {
  render() {
    return (
      <div className="register">
        <div className="container center">
          <h3>Log In</h3>
          <br/>
          <div className="row">
            <form action="POST" className="col s12 m12 l12">
              <div className="card z-depth-5 blue-grey darken-2">
                <div className="card-content white-text">
                  <div className="row section">
                    <div className="input-field col s12 m12 l12">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="row section">
                    <div className="input-field col s12 m12 l12">
                      <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
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
                    Log In
                    <i className="material-icons right">send</i>
                  </button>
                  <br/>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
