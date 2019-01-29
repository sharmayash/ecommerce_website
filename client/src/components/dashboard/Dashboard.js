import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";

class Dashboard extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentProfile();
    }
  }
  render() {
    const { user, isAuthenticated } = this.props.auth;

    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile == null || loading) {
      if (isAuthenticated) {
        dashboardContent = (
          <div className="preloader-wrapper small active">
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
      }
    } else {
      if (Object.keys(profile).length > 0) {
        // user has profile display it
        dashboardContent = (
          <div>
            <h4>Profile exist show products</h4>
          </div>
        )
      } else if (
        isAuthenticated &&
        Object.keys(profile).length === 0 &&
        profile.constructor === Object
      ) {
        //user has no profile yet
        dashboardContent = (
          <div>
            <h5>hello {user.name}</h5>
            <h5>Create Your Profile...</h5>
            <br />
            <Link to="/create-profile" className="btn green z-depth-3">
              Create Profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container center">
          <div className="row">
            <div className="col s12 m12 l12">
              <h3>Home</h3>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.proptypes = {
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
)(Dashboard);
