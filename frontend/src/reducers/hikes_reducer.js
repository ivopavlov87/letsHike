import {
  RECEIVE_HIKES,
  RECEIVE_USER_HIKES,
  RECEIVE_NEW_HIKE
} from "../actions/hike_actions";

const HikesReducer = (
  state = { all: {}, user: {}, new: undefined },
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_HIKES:
      newState.all = action.hikes.data;
      return newState;
    case RECEIVE_USER_HIKES:
      newState.user = action.hikes.data;
      return newState;
    case RECEIVE_NEW_HIKE:
      newState.new = action.hike.data;
      return newState;
    default:
      return state;
  }
};

export default HikesReducer;
