import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

class Login extends Component {
  state = {
    email: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post("/api/users/login", userData)
      .then(res => {
        // get user token
        const { token } = res.data;
        // save token to local storage
        localStorage.setItem("jwtToken", token);
        // set auth token to all headers (all routes)
        if (token) {
          // set the token to all request to a page
          axios.defaults.headers.common["Authorization"] = token;
        } else {
          // delete auth token from local storage
          delete axios.defaults.headers.common["Authorization"];
        }
        // decode token to get user data
        const decode = jwt_decode(token);
        if (decode) {
          this.props.history.push("/dashboard");
          console.log(decode.name);
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="register">
        <div className="container center">
          <h3>Log In</h3>
          <br />
          <div className="row">
            <form
              action="POST"
              onSubmit={this.onSubmit}
              className="col s12 m12 l12"
            >
              <div className="card z-depth-5 blue-grey darken-2">
                <div className="card-content white-text">
                  <div className="row section">
                    <div className="input-field col s12 m12 l12">
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.onChange}
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
                        value={this.state.password}
                        onChange={this.onChange}
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
                  <br />
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
