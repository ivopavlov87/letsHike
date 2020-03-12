import { combineReducers } from "redux";

import HikesReducer from "./hikes_reducer";
import UsersReducer from "./users_reducer";
import ReviewsReducer from "./reviews_reducer";

const EntitiesReducer = combineReducers({
  hikes: HikesReducer,
  users: UsersReducer,
  reviews: ReviewsReducer,
});

export default EntitiesReducer;
