import React, { Component } from "react";
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
            <h5 className="center">Hi! {profile.username} </h5>
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
