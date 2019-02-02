import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import ShowProducts from "../products/ShowProducts";
import PreLoader from "../common/PreLoader";

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
        dashboardContent = <PreLoader />;
      }
    } else {
      if (Object.keys(profile).length > 0) {
        // user has profile display it
        dashboardContent = (
          <div>
            <p></p>
          </div>
        );
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
        <div className="container-fluid center">
          <div className="row">
            <div className="col s12 m12 l12">
              <h3>Home</h3>
              {dashboardContent}
            </div>
          </div>
          <ShowProducts />
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
