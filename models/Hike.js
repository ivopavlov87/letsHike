const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HikeSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  trailheadName: {
    type: String,
    required: true,
    index: true,
    unique: true
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
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Hike = mongoose.model("Hike", HikeSchema);
