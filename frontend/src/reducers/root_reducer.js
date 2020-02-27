import { combineReducers } from "redux";
import errors from "./errors_reducer";
import session from "./session_reducer";
import hikes from "./hikes_reducer";

const RootReducer = combineReducers({
  session,
  hikes,
  errors
});

export default RootReducer;
