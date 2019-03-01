import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addWish } from "../../actions/wishlistActions";
import { getCurrentProfile } from "../../actions/profileAction";
import { connect } from "react-redux";

class ProductInfo extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleWishClick = e => {
    e.preventDefault();

    if (this.props.auth.isAuthenticated) {
      // check if product already exist in wishlist
      if (
        this.props.profile.profile.wishlist
          .map(item => item._id)
          .includes(this.props.product.product._id)
      ) {
        window.M.toast({ html: "Product Already exist in Wishlist!" });
      } else {
        this.props.addWish(this.props.product.product);
        window.M.toast({ html: "added a wish!" });
      }
    } else {
      return window.M.toast({ html: "Log in Please!" });
    }
  };

  handleCartClick = e => {
    e.preventDefault();

    console.log("add to cart");
  };
  render() {
    const { product } = this.props.product;
    return (
      <div className="row">
        <br />
        <div className="col s12 m12 l5">
          <img
            className="responsive-img"
            src={product.image}
            alt={product.company}
          />
        </div>
        <div className="col s12 m12 l7">
          <div className="container">
            <h5>{product.name}</h5>
            <span>by {product.company}</span>
            <br />
            <br />
            <Link to="!#" className="btn" onClick={this.handleWishClick}>
              Add To Wishlist
            </Link>
            <br />
            <br />
            <Link to="!#" className="btn" onClick={this.handleCartClick}>
              Add To Cart
            </Link>
            <h5>
              Specifications :- <br /> {product.specs}
            </h5>
            <h5>
              Descriptions :- <br /> {product.desc}
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

ProductInfo.proptypes = {
  addWish: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product,
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addWish, getCurrentProfile }
)(ProductInfo);
