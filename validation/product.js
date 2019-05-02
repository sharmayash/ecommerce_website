const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProductInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  // data.image = !isEmpty(data.image) ? data.image : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.specs = !isEmpty(data.specs) ? data.specs : "";
  data.desc = !isEmpty(data.desc) ? data.desc : "";
  data.price = !isEmpty(data.price) ? data.price : "";
  data.category = !isEmpty(data.category) ? data.category : "";

  if (validator.isEmpty(data.name)) {
    errors.name = "Product name field is required";
  }

  // if (validator.isEmpty(data.image)) {
  //   errors.image = "Product image url field is required";
  // }

  if (validator.isEmpty(data.company)) {
    errors.company = "Product company field is required";
  }

  if (validator.isEmpty(data.specs)) {
    errors.specs = "Product specification field is required";
  }

  if (validator.isEmpty(data.desc)) {
    errors.desc = "Product description field is required";
  }
  
  if (validator.isEmpty(data.price)) {
    errors.price = "Product price is required";
  }

  if (validator.isEmpty(data.category)) {
    errors.category = "Product category field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
