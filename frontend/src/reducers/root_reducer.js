import { combineReducers } from "redux";
import errors from "./errors_reducer";
import session from "./session_reducer";
import entities from "./entities_reducer";
// import users from "./users_reducer";
// import hikes from "./hikes_reducer";

const RootReducer = combineReducers({
  session,
  entities,
  errors
});

export default RootReducer;
