import React, { Component } from "react";
import { connect } from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListComponent from "../common/SelectListComponent";
import { postNewProfile, getCurrentProfile } from "../../actions/profileAction";

class ProfileComponent extends Component {
  state = {
    username: "",
    address: "",
    accountType: "",
    wishlist: [],
    errors: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
      this.props.getCurrentProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if(nextProps.profile.profile) {
        const profile = nextProps.profile.profile;

        this.setState({
            username: profile.username,
            address: profile.address,
            accountType: profile.accountType
        })
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const profileData = {
      username: this.state.username,
      address: this.state.address,
      accountType: this.state.accountType
    };

    ////////////////////////////////////////////////
    this.props.postNewProfile(profileData, this.props.history);
    ////////////////////////////////////////////////
  };

  render() {
    const { errors } = this.state;

    const options = [
      { label: "Account Type", value: "" },
      { label: "General", value: "General" },
      { label: "Buisness", value: "Buisness" }
    ];

    return (
      <div className="profile">
        <div className="container center">
          <div className="row">
            <div className="col s12">
              <h3>Edit your profile.</h3>
              <p>* = required fields</p>
              <form onSubmit={this.onSubmit} className="container">
                <TextFieldGroup
                  placeholder="Profile Username *"
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange}
                  error={errors.username}
                />
                <SelectListComponent
                  placeholder="Account Type"
                  name="accountType"
                  value={this.state.accountType}
                  onChange={this.onChange}
                  error={errors.accountType}
                  options={options}
                />
                <TextFieldGroup
                  placeholder="Address *"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <button
                  className="btn waves-effect waves-light z-depth-5 hoverable blue-grey darken-2"
                  type="submit"
                  name="action"
                >
                  <i className="material-icons">send</i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ProfileComponent.proptypes = {
  postNewProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  ProfileComponent: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { postNewProfile, getCurrentProfile }
)(withRouter(ProfileComponent));
