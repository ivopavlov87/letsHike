const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");
const { formatHikes, formatHike } = require('../../util/responseHelpers')

const Hike = require("../../models/Hike");
const validateHikeInput = require("../../validation/hike");

router.get("/", (req, res) => {
  Hike.find()
    .sort({ date: -1 })
    .then(hikes => res.json(formatHikes(hikes)))
    .catch(err => res.status(404).json({ noHikesFound: "No hikes found" }));
});

router.get("/:id", (req, res) => {
  Hike.findById(req.params.id)
    .then(hike => res.json(hike))
    .catch(err =>
      res.status(404).json({ noHikeFound: "No hike found with that ID" })
    );
});

router.post(
  '/new',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateHikeInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    Hike.findOne({ trailheadName: req.body.trailheadName }).then(hike => {
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

      newHike.save().then(hike => res.json(formatHike(hike)));
    });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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

    // const response = {
    //   message: "Hike successfully deleted",
    //   id: req.params.id
    // };
    // return res.status(200).json(response);
  }
);

module.exports = router;