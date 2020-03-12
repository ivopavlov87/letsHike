import { combineReducers } from "redux";

import SessionErrorsReducer from "./session_errors_reducer";
import HikesErrorsReducer from "./hikes_errors_reducer";
import ReviewsErrorsReducer from "./reviews_errors_reducer";

export default combineReducers({
  session: SessionErrorsReducer,
  hikes: HikesErrorsReducer,
  reviews: ReviewsErrorsReducer
});
