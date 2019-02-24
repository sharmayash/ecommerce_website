import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { addWish } from "../../actions/wishlistActions";

class WishItem extends Component {
  state = {
    toggle: false
  };

  handleToggle = e => {
    e.preventDefault();
    // find id of clicked item then find item in products with  that id and then pass all data of that item to below function

    
    //this.props.addWish();
    this.setState({
      toggle: !this.state.toggle
    });
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
              <Link to="!#">link</Link>
              <Link to="!#" onClick={this.handleToggle} className="right">
                <i className="material-icons">
                  {this.state.toggle ? "bookmark" : "bookmark_border"}
                </i>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }
}

WishItem.proptypes = {
  addWish: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { addWish }
)(WishItem);
