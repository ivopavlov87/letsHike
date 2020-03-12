import * as ReviewAPIUtil from '../util/review_api_util';

export const RECEIVE_REVIEW = "RECEIVE_REVIEW";
export const RECEIVE_REVIEW_ERRORS = "RECEIVE_REVIEW_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";

export const receiveReview = review => ({
  type: RECEIVE_REVIEW,
  review
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