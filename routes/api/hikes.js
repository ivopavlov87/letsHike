const express = require("express");
const router = express.Router();
const keys = require("../../config/keys");
const mongoose = require("mongoose");
const passport = require("passport");

const Hike = require("../../models/Hike");
const validateHikeInput = require("../../validation/hike");

router.get("/", (req, res) => {
  Hike.find()
    .sort({ date: -1 })
    .then(hikes => res.json(hikes))
    .catch(err => res.status(404).json({ nohikesfound: "No hikes found" }));
});

router.get("/:id", (req, res) => {
  Hike.findById(req.params.id)
    .then(hike => res.json(hike))
    .catch(err =>
      res.status(404).json({ nohikefound: "No tweet found with that ID" })
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
        trailheadName: req.body.trailheadName,
        state: req.body.state,
        // zipcode: req.body.zipcode, DELETE
        distance: parseFloat(req.body.distance).toFixed(2),
        elevationGain: req.body.elevationGain,
        description: req.body.description
      });

      newHike.save().then(hike => res.json(hike));
    });
  }
);

module.exports = router;