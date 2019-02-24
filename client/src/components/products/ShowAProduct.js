import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProduct } from "../../actions/productsActions";
import PreLoader from "../common/PreLoader";
import ProductInfo from "./ProductInfo";

class ShowAProduct extends Component {
  componentDidMount() {
    this.props.getProduct(this.props.match.params.id);
  }

  render() {
    const { product, loading } = this.props;

    let singleProduct;

    if (product === null || loading || Object.keys(product) === 0) {
      singleProduct = (
        <div>
          <PreLoader />
        </div>
      );
    } else {
      singleProduct = (
        <div>
          <ProductInfo product={product} />
        </div>
      );
    }
    return <div className="product container center">{singleProduct}</div>;
  }
}

ShowAProduct.propTypes = {
  getProduct: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  product: state.product
});

export default connect(
  mapStateToProps,
  { getProduct }
)(ShowAProduct);
