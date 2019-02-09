import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProductProItem extends Component {
  render() {
    const { products, auth } = this.props;

    return products.map(product => {
      if (product.seller === auth.user.id) {
        return (
          <div className="col s12 m6 l4" key={product._id}>
            <div className="card">
              <div className="card-image">
                <img src={product.image} alt={product.name} className="cardImage"/>
                <span className="card-title">{product.name}</span>
              </div>
              <div className="card-action">
                <Link to="!#">link</Link>
              </div>
            </div>
          </div>
        );
      } else {
          return null;
      }
    });
  }
}

ProductProItem.proptypes = {
  auth: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProductProItem);
