import React, { Component } from "react";
import PropTypes from "prop-types";

class ProductInfo extends Component {
  render() {
    const { product } = this.props.product;
    return (
      <div>
        <h1>{product.name}</h1>
      </div>
    );
  }
}

ProductInfo.proptypes = {
  product: PropTypes.object.isRequired
};

export default ProductInfo;
