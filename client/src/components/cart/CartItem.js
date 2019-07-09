import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "../../actions/cartActions";
// import { addProductQuantity } from "../../actions/productsActions";

class CartItem extends Component {
  deleteCartFunc = (id, e) => {
    e.preventDefault();

    // this.props.product.product.quantity = 0;
    this.props.deleteCart(id);
    window.location.reload();
  };

  // addCartQuantity = (id, e) => {
  //   e.preventDefault();

  //   this.props.addProductQuantity(id);
  // };

  render() {
    const { cart } = this.props.profile.profile;
    // const { product } = this.props.product;

    return cart.map(cart => {
      return (
        <div className="col s12" key={cart._id}>
          <div className="card">
            <div className="row">
              <div className="card-image col s12 m3 l3">
                <img
                  src={cart.image}
                  alt={cart.name}
                  className="cardImage responsive-img"
                />
                {/* <Link to="!#">
                  <i className="material-icons left">remove</i>
                </Link>
                {product.quantity}
                <Link to="!#">
                  <i
                    className="material-icons right"
                    onClick={this.addCartQuantity.bind(this, cart._id)}
                  >
                    add
                  </i>
                </Link> */}
              </div>
              <div className="card-content s12 m9 l9">
                <p className="card-title">{cart.name}</p>
                <span>by {cart.company}</span>
                <p>{cart.specs}</p>
              </div>
              <div className="card-action s12">
                <Link to={`/product/${cart._id}`}>View</Link>
                <Link
                  to="!#"
                  onClick={this.deleteCartFunc.bind(this, cart._id)}
                >
                  <i className="material-icons right">delete</i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }
}

CartItem.propTypes = {
  deleteCart: PropTypes.func.isRequired,
  // addProductQuantity: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  product: state.product
});

export default connect(
  mapStateToProps,
  { deleteCart /*addProductQuantity */ }
)(CartItem);
