const Validator = require("validator");
const { validText } = require("./validation_helpers");

module.exports = function validateLoginInput(data) {
  let errors = {};


  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";

  if (!data.username) {
  errors.username = 'Username is invalid';
  }

  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  // DELETE
  // UNLESS: figure out how to log in with *either* username or email
  // if (!Validator.isEmail(data.email)) {
  //   errors.email = "Email is invalid";
  // }

  // if (Validator.isEmpty(data.email)) {
  //   errors.email = "Email field is required";
  // }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
