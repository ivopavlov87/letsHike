import {
  RECEIVE_HIKE_ERRORS,
  RECEIVE_NEW_HIKE,
  CLEAR_ERRORS
} from "../actions/hike_actions";

const _nullErrors = [];

const HikesErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_HIKE_ERRORS:
      return action.errors;
    case RECEIVE_NEW_HIKE:
      return _nullErrors;
    case CLEAR_ERRORS:
      return _nullErrors;
    default:
      return state;
  }
};

export default HikesErrorsReducer;
