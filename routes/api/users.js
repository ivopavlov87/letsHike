const keys = require("../../config/keys");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const { formatUser } = require("../../util/responseHelpers");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      username: req.user.username,
      email: req.user.email
    });
  }
);

router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .populate({ path: "hikes", model: "Hike"})
    .then(user => res.json(formatUser(user)))
    .catch(err =>
      res.status(404).json({ noUserFound: "No user found with that ID" })
    );
});

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(user => {
    if (user) {
      // Use the validations to send the error
      errors.registration =
        "A user has already registered with this username and/or email";
      return res.status(400).json(errors);
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        adminType: req.body.adminCode === keys.adminKey
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              const payload = { id: user.id, username: user.username };

              jwt.sign(
                payload,
                keys.secretOrKey,
                { expiresIn: 3600 },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;

  User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  }).then(user => {
    if (!user) {
      // Use the validations to send the error
      errors.user = "Incorrect username/password";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, username: user.username, adminType: user.adminType };

        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        // And here:
        errors.password = "Incorrect username/password";
        return res.status(400).json(errors);
      }
    });
  });
});

module.exports = router;
