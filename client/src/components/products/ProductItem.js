import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  render() {
    const { products } = this.props;

    return products.map(product => (
      <div className="col s12 m6 l4" key={product._id}>
        <div className="card cardpadding">
          <div className="card-image">
            <img src={product.image} alt={product.name} className="cardImage" />
            <span className="card-title">{product.name}</span>
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
