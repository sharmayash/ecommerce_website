import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";
import WishItem from "./WishItem";

class ShowWishlist extends Component {
  render() {
    const { wishlist } = this.props.profile.profile;

    let Content;

    if (wishlist == null) {
      Content = <PreLoader />;
    } else if (wishlist.length === 0) {
      Content = <span>Your wishlist is empty ...</span>;
    } else {
      Content = <WishItem wishlist={wishlist} />;
    }

    return (
      <div>
        <div className="row">{Content}</div>
      </div>
    );
  }
}

ShowWishlist.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(ShowWishlist);
