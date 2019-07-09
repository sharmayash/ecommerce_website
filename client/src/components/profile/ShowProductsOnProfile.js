import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import ProductProItem from "./ProductProItem";
import PreLoader from "../common/PreLoader";

class ShowProductsOnProfile extends Component {
  componentDidMount() {
    this.props.getProducts();
  }

  render() {
    const { products, loading } = this.props.product;

    let postContent;

    if (products == null || loading) {
      postContent = <PreLoader />;
    } else {
      postContent = <ProductProItem products={products} />;
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

ShowProductsOnProfile.propTypes = {
  getProducts: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProducts }
)(ShowProductsOnProfile);
