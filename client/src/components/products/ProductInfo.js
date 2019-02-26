import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addWish } from "../../actions/wishlistActions";
import { connect } from "react-redux";

class ProductInfo extends Component {
  handleWishClick = e => {
    e.preventDefault();

    this.props.addWish(this.props.product.product);
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
        <div className="col s12 m5 l5">
          <img
            className="responsive-img"
            src={product.image}
            alt={product.company}
          />
        </div>
        <div className="col s12 m7 l7">
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
    );
  }
}

ProductInfo.proptypes = {
  addWish: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { addWish }
)(ProductInfo);
