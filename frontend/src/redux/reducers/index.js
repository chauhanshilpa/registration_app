import { combineReducers } from "redux";
import { valuesReducer } from "./reducers";

const rootReducers = combineReducers({
  valuesReducer,
});

export default rootReducers;
