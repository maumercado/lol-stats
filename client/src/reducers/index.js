import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import resultsReducer from "./results_reducers";

const rootReducer = combineReducers({
    form,
    results: resultsReducer
});

export default rootReducer;
