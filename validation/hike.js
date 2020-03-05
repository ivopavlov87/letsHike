const Validator = require("validator");
const { validText } = require("./validation_helpers");

module.exports = function validateHikeInput(data) {
  let errors = {};

  data.trailheadName = validText(data.trailheadName) ? data.trailheadName : "";
  data.state = validText(data.state) ? data.state : "";
  data.distance = Validator.isFloat(data.distance) ? parseFloat(data.distance).toFixed(2) : "";
  data.elevationGain = Validator.isInt(data.elevationGain) ? data.elevationGain : "";
  data.description = validText(data.description) ? data.description : "";
  
  if (Validator.isEmpty(data.trailheadName)) {
    errors.trailheadName = "Trailhead name field is required";
  }

  if (!Validator.isLength(data.trailheadName, { min: 5, max: 140 })) {
    errors.trailheadName = "Trailhead name must be between 5 and 140 characters";
  }

  if (Validator.isEmpty(data.state)) {
    errors.state = "State field is required";
  }

  if (Validator.isEmpty(data.distance)) {
    errors.distance = "Distance field is required and must be a number, examples: 1, 7.3, 10.25";
  }

  if (Validator.isEmpty(data.elevationGain)) {
    errors.elevationGain = "Elevation gain field is required and must be a whole number, examples: 1, 7, 10";
  }

  if (Validator.isEmpty(data.description)) {
    errors.description = "Description field is required";
  }

  if (!Validator.isLength(data.description, { min: 5, max: 1000 })) {
    errors.description =
      "Description must be between 5 and 1,000 characters";
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0
  };
};
