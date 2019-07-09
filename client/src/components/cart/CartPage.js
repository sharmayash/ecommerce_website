import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileAction";
import PreLoader from "../common/PreLoader";
import ShowCart from "./ShowCart";

class CartPage extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { profile, loading } = this.props.profile;

    let showCart;

    if (profile == null || loading) {
      showCart = (
        <div>
          <PreLoader />
          <span>Loading Your Cart ...</span>
        </div>
      );
    } else if (
      Object.keys(profile).length > 0 &&
      profile.constructor === Object
    ) {
      showCart = (
        <div>
          <ShowCart />
        </div>
      );
    }

    return (
      <div className="container center">
        <h5>CheckOut Now ...</h5>
        {showCart}
      </div>
    );
  }
}

CartPage.propTypes = {
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
)(CartPage);
