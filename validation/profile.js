const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.username = !isEmpty(data.username) ? data.username : "";
  data.address = !isEmpty(data.address) ? data.address : "";

  if (validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  if (validator.isEmpty(data.address)) {
    errors.address = "Address field is required";
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
