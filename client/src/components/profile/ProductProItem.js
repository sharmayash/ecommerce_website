import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteProduct } from "../../actions/productsActions";
import { Link } from "react-router-dom";

class ProductProItem extends Component {
  deleteProduct = (id, e) => {
    e.preventDefault();

    this.props.deleteProduct(id);
    window.location.reload()
  };

  render() {
    const { products, auth } = this.props;

    return products.map(product => {
      if (product.seller === auth.user.id) {
        return (
          <div className="col s12 m6 l4" key={product._id}>
            <div className="card">
              <div className="card-image">
                <img
                  src={product.image}
                  alt={product.name}
                  className="cardImage"
                />
                <span className="card-title">{product.name}</span>
              </div>
              <div className="card-action">
                <Link to={`/product/${product._id}`}>View</Link>
                <Link
                  to="!#"
                  onClick={this.deleteProduct.bind(this, product._id)}
                >
                  <i className="material-icons right">delete</i>
                </Link>
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
  deleteProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteProduct }
)(ProductProItem);
