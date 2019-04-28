import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import PhoneItems from "./PhoneItems";
import PreLoader from "../common/PreLoader";

class ShowPhones extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;

    let postContent;

    if (products == null || loading) {
      postContent = (
        <div>
          <PreLoader />
          <span>Loading Products ...</span>
        </div>
      );
    } else {
      postContent = <PhoneItems products={products} />;
    }

    return (
      <div className="products container-fluid">
        <div className="productitem">
          <div className="row product-card">{postContent}</div>
        </div>
      </div>
    );
  }
}

ShowPhones.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(ShowPhones);
