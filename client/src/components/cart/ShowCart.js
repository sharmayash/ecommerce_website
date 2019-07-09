import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import CartItem from "./CartItem";

class ShowCart extends Component {
  render() {
    const { cart } = this.props.profile.profile;

    let Content;

    if (cart == null) {
      Content = <PreLoader />;
    } else if (cart.length === 0) {
      Content = <span>Your cart is empty ...</span>;
    } else {
      Content = <CartItem cart={cart} />;
    }

    return (
      <div>
        <div className="row container">{Content}</div>
      </div>
    );
  }
}

ShowCart.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ShowCart);
