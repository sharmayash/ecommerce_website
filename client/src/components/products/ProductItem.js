import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { products } = this.props;

    return products.map(product => (
      <div className="col s12 m6 l4" key={product._id}>
        <div className="card cardpadding">
          <div className="card-image center">
            <img src={product.image} alt={product.name} className="cardImage" />
            <span className="card-title">{product.name}</span>
            <Link to="#" className="btn-floating halfway-fab waves-effect waves-light btn-large deep-purple lighten-5 black-text z-index-1">
              $ {product.price}
            </Link>
          </div>
          <div className="card-action">
            <Link to={`/product/${product._id}`}>View</Link>
          </div>
        </div>
      </div>
    ));
  }
}

ProductItem.propTypes = {
  products: PropTypes.array.isRequired
};

export default ProductItem;
