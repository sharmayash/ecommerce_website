import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteWish } from "../../actions/wishlistActions";

class WishItem extends Component {
  deleteWishFunc = (id, e) => {
    e.preventDefault();

    this.props.deleteWish(id);
    window.location.reload();
  };

  render() {
    const { wishlist } = this.props.profile.profile;

    return wishlist.map(wish => {
      return (
        <div className="col s12 m6 l4" key={wish._id}>
          <div className="card">
            <div className="card-image">
              <img src={wish.image} alt={wish.name} className="cardImage" />
              <span className="card-title">{wish.name}</span>
            </div>
            <div className="card-action">
              <Link to={`/product/${wish._id}`}>View</Link>
              <Link to="!#" onClick={this.deleteWishFunc.bind(this, wish._id)}>
                <i className="material-icons right">delete</i>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
}

WishItem.proptypes = {
  deleteWish: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { deleteWish }
)(WishItem);
