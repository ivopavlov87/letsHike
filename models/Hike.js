const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review"
    }
  ],
  trailheadName: {
    type: String,
    required: true,
    index: true,
    unique: true,
    minlength: 5,
    maxlength: 140
  },
  state: {
    type: String,
    required: true
  },
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  elevationGain: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1000
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hike = mongoose.model("Hike", HikeSchema);
