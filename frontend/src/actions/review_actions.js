import * as ReviewAPIUtil from '../util/review_api_util';

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const REMOVE_REVIEW = "REMOVE_REVIEW";
export const RECEIVE_USER_REVIEWS = "RECEIVE_USER_REVIEWS";
export const RECEIVE_HIKE_REVIEWS = "RECEIVE_HIKE_REVIEWS";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
})

export const receiveUserReviews = reviews => ({
  type: RECEIVE_USER_REVIEWS,
  reviews
})

export const receiveHikeReviews = reviews => ({
  type: RECEIVE_HIKE_REVIEWS,
  reviews
})

export const removeReview = reviewId => ({
  type: REMOVE_REVIEW,
  reviewId
})

export const receiveReviewErrors = errors => ({
  type: RECEIVE_REVIEW_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
});

export const composeReview = data => dispatch => {
  return ReviewAPIUtil.writeReview(data)
    .then(review => dispatch(receiveReview(review)))
    .catch(err => dispatch(receiveReviewErrors(err.response.data)))
}

export const fetchReview = id => dispatch => {
  return ReviewAPIUtil.getReview(id)
    .then(review => dispatch(receiveReview(review)))
    .catch(err => console.log(err))
}

export const fetchUserReviews = id => dispatch => {
  return ReviewAPIUtil.getUserReviews(id)
    .then(reviews => dispatch(receiveUserReviews(reviews)))
    .catch(err => console.log(err))
}

export const fetchHikeReviews = id => dispatch => {
  return ReviewAPIUtil.getHikeReviews(id)
    .then(reviews => dispatch(receiveHikeReviews(reviews)))
    .catch(err => console.log(err))
}

export const updateReview = review => dispatch => {
  return ReviewAPIUtil.editReview(review)
    .then(review => dispatch(receiveReview(review)))
    .catch(err => dispatch(receiveReviewErrors(err.response.data)))
}

export const deleteReview = reviewId => dispatch => {
  return ReviewAPIUtil.deleteReview(reviewId)
    .then((review) => dispatch(removeReview(reviewId)))
    .catch(err => console.log(err))
}