import {
  RECEIVE_HIKES,
  RECEIVE_USER_HIKES,
  RECEIVE_NEW_HIKE,
  REMOVE_HIKE
} from "../actions/hike_actions";

const HikesReducer = (
  state = { all: {}, user: {} },
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
      newState.all[action.hike.data.id] = action.hike.data;
      return newState;
    case REMOVE_HIKE:
      console.log("isArray", newState)
      delete newState.all[action.hikeId];
      delete newState.user[action.hikeId];
      return newState;
    default:
      return state;
  }
};

export default HikesReducer;
