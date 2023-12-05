import { combineReducers } from "redux";
import tacheReducer from "./tache.reducer";
import tacheReducerAPI from "./API_taches_reducers";
import tacheUserAPI from "./API_user_reducer";
import projetReducer from "./porjets.reducer";
import ListeTachesReducer from "./ListeTaches.reducer";
export default combineReducers({
  tacheReducer,
  tacheReducerAPI,
  tacheUserAPI,
  projetReducer,
  ListeTachesReducer
})