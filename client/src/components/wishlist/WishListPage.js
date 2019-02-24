import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import PreLoader from "../common/PreLoader";
import ShowWishlist from "./ShowWishlist";

class WishListPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let showWishlist;

    if (profile == null || loading) {
      showWishlist = (
        <div>
          <PreLoader />
          <span>Loading Your Wishlist ...</span>
        </div>
      );
    } else if (
      Object.keys(profile).length > 0 &&
      profile.constructor === Object
    ) {
      showWishlist = (
        <div>
          <div className="row">
            <h4 className="center">Hi! {profile.username} </h4>
          </div>
          <ShowWishlist />
        </div>
      );
    }

    return (
      <div className="container-fluid center">
        <h5>Your Wishlist Products</h5>
        {showWishlist}
      </div>
    );
  }
}

WishListPage.proptypes = {
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
)(WishListPage);
