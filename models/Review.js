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
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 140
  },
  body: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
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
