const Validator = require("validator");
const { validText } = require("./validation_helpers");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.loginInput = validText(data.loginInput) ? data.loginInput : "";

  if (!data.loginInput) {
    errors.loginInput = "Username or valid email is required for login"
  } else if(data.loginInput.includes('@')){
      if(Validator.isEmail(data.loginInput)){
        data.email = data.loginInput;
      } else {
        errors.email = "Email is invalid"
      }
    } else {
      data.username = data.loginInput;
    }
  
  data.password = validText(data.password) ? data.password : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
