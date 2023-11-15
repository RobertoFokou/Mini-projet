import { combineReducers } from "redux";
import tacheReducer from "./tache.reducer";
import tacheReducerAPI from "./API_taches_reducers";
export default combineReducers({
  tacheReducer,
  tacheReducerAPI,
})