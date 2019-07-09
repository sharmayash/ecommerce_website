import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
//import SelectListComponent from "../common/SelectListComponent";
import { postNewProfile } from "../../actions/profileAction";

class ProfileComponent extends Component {
  state = {
    username: "",
    address: "",
//    accountType: "",
    wishlist: [],
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      username: this.state.username,
      address: this.state.address
    //  accountType: this.state.accountType
    };

    ////////////////////////////////////////////////
    this.props.postNewProfile(profileData, this.props.history);
    ////////////////////////////////////////////////
  };

  render() {
    const { errors } = this.state;

    // const options = [
    //   { label: "Account Type", value: "" },
    //   { label: "General", value: "General" },
    //   { label: "Buisness", value: "Buisness" }
    // ];

    return (
      <div className="profile">
        <div className="container center">
          <div className="row">
            <div className="col s12">
              <h3>Add Some Info. For Best Experience.</h3>
              <p>* = required fields</p>
              <form onSubmit={this.onSubmit} className="container center">
                <div className="card z-depth-0 blue-grey">
                  <div className="card-content white-text">
                    <div className="row">
                      <TextFieldGroup
                        placeholder="Profile Username *"
                        name="username"
                        value={this.state.username}
                        onChange={this.onChange}
                        error={errors.username}
                      />
                    </div>
                    {/* <div className="row">
                      <SelectListComponent
                        placeholder="Account Type"
                        name="accountType"
                        value={this.state.accountType}
                        onChange={this.onChange}
                        error={errors.accountType}
                        options={options}
                      />
                    </div> */}
                    <div className="row">
                      <TextFieldGroup
                        placeholder="Address *"
                        name="address"
                        value={this.state.address}
                        onChange={this.onChange}
                        error={errors.address}
                      />
                    </div>
                  </div>
                  <div className="card-action">
                    <button
                      className="btn waves-effect waves-light z-depth-5 hoverable blue-grey darken-2"
                      type="submit"
                      name="action"
                    >
                      <i className="material-icons">send</i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileComponent.propTypes = {
  postNewProfile: PropTypes.func.isRequired,
  ProfileComponent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postNewProfile }
)(withRouter(ProfileComponent));
