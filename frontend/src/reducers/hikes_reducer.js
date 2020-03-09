import {
  RECEIVE_HIKES,
  RECEIVE_USER_HIKES,
  RECEIVE_HIKE,
  REMOVE_HIKE
} from "../actions/hike_actions";

const HikesReducer = (
  state = {},
  action
) => {
  Object.freeze(state);
  let newState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_HIKES:
      newState = action.hikes.data;
      return newState;
    case RECEIVE_HIKE:
      newState[action.hike.data.id] = action.hike.data;
      return newState;
    case RECEIVE_USER_HIKES:
      newState = action.hikes.data;
      return newState;
    case REMOVE_HIKE:
      delete newState[action.hikeId];
      return newState;
    default:
      return state;
  }
};

export default HikesReducer;
