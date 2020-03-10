import { combineReducers } from "redux";

import HikesReducer from "./hikes_reducer";
import UserReducer from "./users_reducer";

const EntitiesReducer = combineReducers({
  hikes: HikesReducer,
  users: UserReducer,
});

export default EntitiesReducer;
