const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const { formatHike, formatReviews, formatReview } = require("../../util/responseHelpers");

const Hike = require("../../models/Hike");
const User = require("../../models/User");
const Review = require("../../models/Review");
const validateReviewInput = require("../../validation/review");

// This is to make a new review
router.post(
  '/new',
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    const { errors, isValid } = validateReviewInput(req.body);
    
    if (!isValid) {
      return res.status(400).json(errors);
    }
    // checks to make sure a review doesn't already exist
    // with the same review title
    Review.findOne({ perHikeTitle: req.body.hike.toString() + req.body.title.toLowerCase() })
      .then(review => {
        if (review) {
          // Use the validations to send the error
          errors.registration =
            "A review for this hike, with this title, already exists. Please re-title your review. Note: Great Hike, great hike, GrEaT hIke, GREAT HIKE, etc., are all equivalent.";
          return res.status(400).json(errors);
        }

        // creates new review
        const newReview = new Review({
          user: req.body.user,
          hike: req.body.hike,
          title: req.body.title,
          body: req.body.body,
          rating: req.body.rating,

          // creates a field so that each hike review must have a title
          // that is unique to the specific hike
          // meaning: reviews can have identical titles, so long as they
          // belong to different hikes
          perHikeTitle: req.body.hike.toString() + req.body.title.toLowerCase()
        });

        newReview.save().then(review => {

          // adds review to user document for the user that
          // submitted the review
          User.findById(review.user).then(user => {
            user.reviews.push(review);
            user.save();
          })

          // adds review to the hike document that the
          // review was submitted for
          Hike.findById(review.hike).then(hike => {
            hike.reviews.push(review);
            hike.save();
          })
          return res.json(formatReview(newReview))
        });
      });
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {

    Review.findById(req.params.id).then(reviewToDelete => {
      // This removes review from the owner-user document's
      // "reviews" array, i.e., the reviews they've made
      User.findById(reviewToDelete.user).then(user => {
        user.reviews = user.reviews.filter(userReview => reviewToDelete._id.toString() !== userReview.toString());
        user.save();
      });

      // This removes the review from the reviewed hike document's
      // "reviews" array, i.e., the hike that the review
      // belongs to
      Hike.findById(reviewToDelete.hike).then(hike => {
        hike.reviews = hike.reviews.filter(hikeReview => reviewToDelete._id.toString() !== hikeReview.toString());
        hike.save();
      });

      // This removes the review from the database
      Review.findByIdAndRemove(req.params.id, (err, review) => {
        if (!review) {
          return res
            .status(404)
            .json({ noReviewFound: "No review found with that ID" });
        } else {
          const response = {
            message: "Review successfully deleted",
            id: req.params.id
          };
          return res.status(200).json(response);
        }
      });
    });
  }
);

module.exports = router;