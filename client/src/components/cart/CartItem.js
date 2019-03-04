import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteCart } from "../../actions/cartActions";

class CartItem extends Component {
  deleteCartFunc = (id, e) => {
    e.preventDefault();

    this.props.deleteCart(id);
    window.location.reload();
  };

  render() {
    const { cart } = this.props.profile.profile;

    return cart.map(cart => {
      return (
        <div className="col s12" key={cart._id}>
          <div className="card horizontal">
            <div className="card-image">
              <img src={cart.image} alt={cart.name} className="cardImage" />
            </div>
            <div className="card-stacked">
              <div className="card-content">
                <p className="card-title">{cart.name}</p>
                <span>by {cart.company}</span>
                <p>{cart.desc}</p>
              </div>
              <div className="card-action">
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
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteCart }
)(CartItem);
