import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addWish } from "../../actions/wishlistActions";
import { addCart } from "../../actions/cartActions";
// import { addProductQuantity } from "../../actions/productsActions";
import { getCurrentProfile } from "../../actions/profileAction";
import { connect } from "react-redux";
import PreLoader from "../common/PreLoader";

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
        window.location.reload();
      }
    } else {
      return window.M.toast({ html: "Log in Please!" });
    }
  };

  handleCartClick = e => {
    e.preventDefault();

    if (this.props.auth.isAuthenticated) {
      // check if product already exist in cart
      if (
        this.props.profile.profile.cart
          .map(item => item._id)
          .includes(this.props.product.product._id)
      ) {
        window.M.toast({
          html: "Product already exist in cart"
        });
      } else {
        // this.props.addQuantity(this.props.product.product._id); // for cart
        // this.props.addProductQuantity(this.props.product.product._id);
        this.props.addCart(this.props.product.product);
        window.M.toast({ html: "added an item to cart!" });
        window.location.reload();
      }
    } else {
      return window.M.toast({ html: "Log in Please!" });
    }
  };

  render() {
    const { product, loading } = this.props.product;

    if (loading) {
      return (
        <div style={{ marginTop: "25%" }}>
          <PreLoader />
          <br />
          <span>Loading Info. for u ...</span>
        </div>
      );
    }

    return (
      <div className="info grey-text">
        <br />
        <div className="row">
          <aside className="col s12 m12 l5">
            <img
              className="responsive-img"
              src={product.image}
              alt={product.company}
              style={{ maxHeight: "600px" }}
            />
          </aside>
          <div style={{ marginTop: "10vh" }} className="col s12 m12 l7">
            <div className="container">
              <h4>{product.name}</h4>
              <span>by {product.company}</span>
              <br />
              <span>category:- {product.category}</span>
              <br />
              <p>Price :: $ {product.price}</p>
              <div className="row" style={{ paddingTop: "20px" }}>
                <div className="col s6 m6 l6">
                  <Link
                    to="!#"
                    className="btn blue-grey"
                    onClick={this.handleWishClick}
                  >
                    Wishlist Me!
                  </Link>
                </div>
                <div className="col s6 m6 l6">
                  <Link
                    to="!#"
                    className="btn blue-grey"
                    onClick={this.handleCartClick}
                  >
                    Add To Cart
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "50px" }}>
          <h5>Specifications :-</h5>
          <span className="">{product.specs}</span>
          <h5>Descriptions :-</h5>
          <span>{product.desc}</span>
        </div>
      </div>
    );
  }
}

ProductInfo.propTypes = {
  addWish: PropTypes.func.isRequired,
  addCart: PropTypes.func.isRequired,
  // addProductQuantity: PropTypes.func.isRequired,
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
  { addWish, addCart, /*addProductQuantity,*/ getCurrentProfile }
)(ProductInfo);
