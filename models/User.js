const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  adminType: {
    type: Boolean
  },
  hikes: [{
    type: Schema.Types.ObjectId,
    ref: "Hike"
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("User", UserSchema);