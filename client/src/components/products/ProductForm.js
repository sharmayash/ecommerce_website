import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import { addProduct } from "../../actions/productsActions";
import SelectListComponent from "../common/SelectListComponent";

class ProductForm extends Component {
  state = {
    name: "",
    image: "",
    desc: "",
    specs: "",
    company: "",
    category: "",
    inventory: "",
    price: "",
    // quantity: 0,
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }
  onSubmit = e => {
    e.preventDefault();

    const { user } = this.props.auth;

    const newProduct = {
      name: this.state.name,
      image: this.state.image,
      desc: this.state.desc,
      specs: this.state.specs,
      company: this.state.company,
      addedBy: user.name,
      category: this.state.category,
      price: this.state.price,
      inventory: this.state.inventory
      // quantity: 0
    };

    this.props.addProduct(newProduct, this.props.history);
    this.setState({
      name: "",
      image: "",
      desc: "",
      specs: "",
      company: "",
      inventory: "",
      category: "",
      price: ""
      // quantity: 0
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;

    const options = [
      { label: "Select Product Category *", value: "0" },
      { label: "SmartPhones", value: "phones" },
      { label: "Laptops", value: "laptops" },
      { label: "Watches", value: "watches" },
      { label: "Gaming", value: "gaming" },
      { label: "Headset/Earphones", value: "headset" }
    ];

    return (
      <div className="productform">
        <div className="container center">
          <h4>Sell Product</h4>
          <div className="row container">
            <form
              action="POST"
              onSubmit={this.onSubmit}
              className="col s12 m12 l12"
            >
              <div className="card z-depth-5 blue-grey darken-2">
                <div className="card-content white-text">
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Name of product"
                      name="name"
                      type="text"
                      value={this.state.name}
                      onChange={this.onChange}
                      error={errors.name}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Company Name"
                      name="company"
                      type="text"
                      value={this.state.company}
                      onChange={this.onChange}
                      error={errors.company}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Image url"
                      name="image"
                      type="text"
                      value={this.state.image}
                      onChange={this.onChange}
                      error={errors.image}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Specification"
                      name="specs"
                      type="text"
                      value={this.state.specs}
                      onChange={this.onChange}
                      error={errors.specs}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Description"
                      name="desc"
                      type="text"
                      value={this.state.desc}
                      onChange={this.onChange}
                      error={errors.desc}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Total no. of item available"
                      name="inventory"
                      type="text"
                      value={this.state.inventory}
                      onChange={this.onChange}
                      error={errors.inventory}
                    />
                  </div>
                  <div className="row">
                    <TextFieldGroup
                      placeholder="Price"
                      name="price"
                      type="text"
                      value={this.state.price}
                      onChange={this.onChange}
                      error={errors.price}
                    />
                  </div>
                  <div className="row">
                    <SelectListComponent
                      name="category"
                      options={options}
                      value={this.state.category}
                      onChange={this.onChange}
                      error={errors.category}
                    />
                  </div>
                </div>
                <div className="card-action">
                  <button
                    className="btn waves-effect waves-light z-depth-5 hoverable blue-grey darken-2"
                    type="submit"
                    name="action"
                  >
                    submit
                    <i className="material-icons right">send</i>
                  </button>
                  <br />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ProductForm.propTypes = {
  addProduct: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addProduct }
)(ProductForm);
