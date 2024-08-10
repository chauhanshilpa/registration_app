import { combineReducers } from "redux";
import { inputValuesReducer } from "./reducers";

const rootReducers = combineReducers({
  inputValuesReducer,
});

export default rootReducers;
