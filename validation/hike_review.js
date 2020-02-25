// const Validator = require("validator");
// const { validText } = require("./validation_helpers");

// module.exports = function validateHikeReviewInput(data) {
//   let errors = {};

//   data.trailheadName = validText(data.trailheadName) ? data.trailheadName : "";
//   data.state = validText(data.state) ? data.state : "";
//   data.distance = validText(data.distance) ? parseFloat(data.distance) : "";
//   data.elevationGain = validText(data.elevationGain) ? parseInt(data.elevationGain) : "";
//   data.totalTime = validText(data.totalTime) ? parseFloat(data.totalTime) : "";
//   data.rating = validText(data.rating) ? parseInt(data.rating) : "";
//   data.review = validText(data.review) ? data.review : "";

//   if (!Validator.isLength(data.text, { min: 5, max: 3000 })) {
//     errors.text = "Review body must be between 5 and 3000 characters";
//   }

//   if (Validator.isEmpty(data.text)) {
//     errors.text = "Text field is required";
//   }

//   return {
//     errors,
//     isValid: Object.keys(errors).length === 0
//   };
// };
