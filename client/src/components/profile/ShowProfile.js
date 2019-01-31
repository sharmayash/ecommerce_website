import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";

class ShowProfile extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile, loading } = this.props.profile;
    let showProfile;
    if (profile == null || loading) {
      showProfile = (
        <div className="preloader-wrapper small active center">
          <div className="spinner-layer spinner-blue-only">
            <div className="circle-clipper left">
              <div className="circle" />
            </div>
            <div className="gap-patch">
              <div className="circle" />
            </div>
            <div className="circle-clipper right">
              <div className="circle" />
            </div>
          </div>
        </div>
      );
    } else {
      if (Object.keys(profile).length > 0 && profile.constructor === Object) {
        showProfile = (
          <div>
            <div className="row head">
              <Link
                to="/edit-profile"
                className="btn blue-grey darken-3 z-depth-2 right"
              >
                <i className="material-icons">edit</i>
              </Link>
              <h4 className="center">Hi! {profile.username} </h4>
            </div>
            <div className="row center">
              <h5>{profile.user.name}</h5>
              <h5>{profile.user.email}</h5>
              <br />
              <h5>
                Address : <br />
                <br /> {profile.address}
              </h5>
              <br />
              <span>Account Type: {profile.accountType}</span>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="container">
        <br />
        {showProfile}
        <br />
      </div>
    );
  }
}

ShowProfile.proptypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(ShowProfile);
