import {
  ADD_TACHE_API,
  DELETE_TACHE_API,
  GETONE_TACHE_API,
  GET_TACHE_API,
  GETALL_TACHE_API,
} from "../actions/API_taches";

const initialState = [];

export default function tacheReducerAPI(state = initialState, action) {
  switch (action.type) {
    case GET_TACHE_API:
      return action.payload;
    case GETALL_TACHE_API:
      return action.payload;
    case ADD_TACHE_API:
      return [action.payload, ...state];
    case GETONE_TACHE_API:
      return action.payload;
    case DELETE_TACHE_API:
      return state.filter((tache) => tache.id !== action.payload);
    default:
      return state;
  }
}
