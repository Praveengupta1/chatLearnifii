import { combineReducers } from "redux";
import roomReducer from "./Reducer";

const reducer = combineReducers({
  rooms: roomReducer,
});

export default reducer;
