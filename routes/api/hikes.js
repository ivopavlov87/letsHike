const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const { formatHikes, formatHike } = require('../../util/responseHelpers')

const Hike = require("../../models/Hike");
const User = require("../../models/User");
const validateHikeInput = require("../../validation/hike");

// This is for all hikes
router.get("/", (req, res) => {
  Hike.find()
    .populate({path: 'user', model: 'User', select: 'id username email'})
    .sort({ date: -1 })
    .then(hikes => res.json(formatHikes(hikes)))
    .catch(err => res.status(404).json({ noHikesFound: "No hikes found" }));
});

// This is for one specific hike
router.get("/:id", (req, res) => {
  Hike.findById(req.params.id)
    .populate({ path: "user", model: "User", select: "id username email" })
    .then(hike => res.json(hike))
    .catch(err =>
      res.status(404).json({ noHikeFound: "No hike found with that ID" })
    );
});

// This is for all hikes from a specific user
router.get("/user/:user_id", (req, res) => {
  Hike.find({ user: req.params.user_id })
    .populate({ path: "user", model: "User", select: "id username email" })
    .sort({ date: -1 })
    .then(hikes => res.json(formatHikes(hikes)))
    .catch(err =>
      res.status(404).json({ noHikesFound: "No hikes found from that user" })
    );
});

// This is to make a new hike
router.post(
  '/new',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateHikeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    // console.log("req", req);
    Hike.findOne({ trailheadName: req.body.trailheadName })
      .then(hike => {
        if (hike) {
          // Use the validations to send the error
          errors.registration =
            "A hike has already registered with this trailhead name";
          return res.status(400).json(errors);
        }

        const newHike = new Hike({
          user: req.body.user,
          trailheadName: req.body.trailheadName,
          state: req.body.state,
          distance: parseFloat(req.body.distance).toFixed(2),
          elevationGain: req.body.elevationGain,
          description: req.body.description
        });

        newHike.save().then(hike => {
          User.findById(hike.user).then(user =>{
            user.hikes.push(hike._id);
            user.save();
          })
          return res.json(formatHike(hike))
        });
      });
  }
);


// This is to delete a hike
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Hike.findById(req.params.id).then(hike => {
      User.findById(hike.user).then(user => {
        user.hikes.splice(user.hikes.indexOf(hike._id), 1);
        user.save();
      });

      Hike.findByIdAndRemove(req.params.id, (err, hike) => {
        if (!hike) {
          return res
            .status(404)
            .json({ noHikeFound: "No hike found with that ID" });
        } else {
          const response = {
            message: "Hike successfully deleted",
            id: req.params.id
          };
          return res.status(200).json(response);
        }
      });
    });

    // BACKUP DELETE ROUTE FUNCTIONALITY
    // Hike.findByIdAndRemove(req.params.id, (err, hike) => {
    //   if (!hike) {
    //     return res
    //       .status(404)
    //       .json({ noHikeFound: "No hike found with that ID" });
    //   } else {
    //     const response = {
    //       message: "Hike successfully deleted",
    //       id: req.params.id
    //     };
    //     return res.status(200).json(response);
    //   }
    // });
  }
);

module.exports = router;