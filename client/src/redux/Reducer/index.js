import { combineReducers } from "redux";
import userReducer from "./userReducer";

const reducer = combineReducers({
  chatUser: userReducer,
});

export default reducer;
