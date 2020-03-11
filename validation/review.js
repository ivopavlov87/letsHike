const Validator = require("validator");
const { validText } = require("./validation_helpers");

module.exports = function validateReviewInput(data) {
  let errors = {};

  data.title = validText(data.title) ? data.title : "";
  data.body = validText(data.body) ? data.body : "";
  data.rating = validText(data.rating) ? parseInt(data.rating) : "";

  if (!Validator.isLength(data.title, { min: 5, max: 140 })) {
    errors.title = "Review title must be between 5 and 140 characters";
  }

  if (!Validator.isLength(data.body, { min: 5, max: 1000 })) {
    errors.body = "Review body must be between 5 and 1000 characters";
  }

  if (Validator.isEmpty(data.rating.toString())) {
    errors.rating = "Rating value is required and must be a whole number between 1 (bad) and 5 (amazing)";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
