import {
  // RECEIVE_REVIEWS,
  RECEIVE_USER_REVIEWS,
  RECEIVE_HIKE_REVIEWS,
  RECEIVE_REVIEW,
  REMOVE_REVIEW
} from "../actions/review_actions";

const ReviewsReducer = (state = {}, action) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    // case RECEIVE_REVIEWS:
    //   newState = action.reviews.data;
    //   return newState;
    case RECEIVE_REVIEW:
      newState[action.review.data.id] = action.review.data;
      return newState;
    case RECEIVE_USER_REVIEWS:
      newState = action.reviews.data;
      return newState;
    case RECEIVE_HIKE_REVIEWS:
      newState = action.reviews.data;
      return newState;
    case REMOVE_REVIEW:
      delete newState[action.reviewId];
      return newState;
    default:
      return state;
  }
};

export default ReviewsReducer;
