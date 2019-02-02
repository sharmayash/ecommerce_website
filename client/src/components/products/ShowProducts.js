import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import ProductItem from "./ProductItem";
import PreLoader from "../common/PreLoader";

class ShowProducts extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;

    let postContent;

    if (products == null || loading) {
      postContent = <PreLoader />;
    } else {
      postContent = <ProductItem products={products} />;
    }

    return (
      <div className="products container-fluid">
        <div className="productitem">
          <div className="row">{postContent}</div>
        </div>
      </div>
    );
  }
}

ShowProducts.proptypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(ShowProducts);
