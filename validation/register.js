const Validator = require("validator");
const keys = require("../config/keys");;
const {
  validText,
  hasSpecialChar,
  hasNumber,
  hasCapital
} = require("./validation_helpers");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.username = validText(data.username) ? data.username : "";
  data.email = validText(data.email) ? data.email : "";
  data.password = validText(data.password) ? data.password : "";
  data.password2 = validText(data.password2) ? data.password2 : "";
  data.adminCode = validText(data.adminCode) ? data.adminCode : "";
  
  if (!Validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.username = "Username must be between 4 and 30 characters";
  }

  if (!Validator.isAlphanumeric(data.username)) {
    errors.username = "Username must contain only letters and numbers"
  }
  
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }
  
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  
  if (!hasSpecialChar(data.password)) {
    errors.passwordSpecial = "Password must contain at least 1 of the following special characters: @, %, +, !, #, $, ^, ?, :, (, ), [, ], ~, -, _, . (period), , (comma).";
  }

  if (!hasNumber(data.password)) {
    errors.passwordNumber = "Password must contain at least 1 number.";
  }

  if (!hasCapital(data.password)) {
    errors.passwordCapital = "Password must contain at least 1 capital letter.";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (!Validator.equals(data.adminCode, keys.adminKey) && data.adminCode.length) {
    errors.adminCode = "Wrong admin code; leave blank to create regular user";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
