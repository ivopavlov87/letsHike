const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  hike: {
    type: Schema.Types.ObjectId,
    ref: "Hike"
  },
  body: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Review = mongoose.model("Review", ReviewSchema);
