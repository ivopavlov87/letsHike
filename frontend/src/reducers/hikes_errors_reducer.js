import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_NEW_HIKE
} from "../actions/hike_actions";

const _nullErrors = [];

const SessionErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      return action.errors;
    case RECEIVE_NEW_HIKE:
      return _nullErrors;
    default:
      return state;
  }
};

export default SessionErrorsReducer;
