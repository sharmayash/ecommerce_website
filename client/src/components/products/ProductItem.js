import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  state = {
    toggle: false
  };

  handleClick = e => {
    e.preventDefault();

    this.setState({
      toggle: !this.state.toggle
    });
  };

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
            <Link to="!#">View</Link>
            <Link to="!#" onClick={this.handleClick} className="right">
              <i className="material-icons">
                {this.state.toggle ? "bookmark" : "bookmark_border"}
              </i>
            </Link>
          </div>
        </div>
      </div>
    ));
  }
}

ProductItem.proptypes = {
  products: PropTypes.array.isRequired
};

export default ProductItem;
