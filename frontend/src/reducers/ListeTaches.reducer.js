import {
    ADD_TACHE_PROJET,
    DELETE_TACHE_PROJET,
    GETONE_TACHE_PROJET,
    GET_TACHE_PROJET,
    GETALL_TACHE_PROJET,
  } from "../actions/ListeTaches.action";
  
  const initialState = [];
  
  export default function ListeTachesReducer(state = initialState, action) {
    switch (action.type) {
      case GET_TACHE_PROJET:
        return action.payload;
      case GETALL_TACHE_PROJET:
        return action.payload;
      case ADD_TACHE_PROJET:
        return [action.payload, ...state];
      case GETONE_TACHE_PROJET:
        return action.payload;
      case DELETE_TACHE_PROJET:
        return state.filter((tache) => tache.id !== action.payload);
      default:
        return state;
    }
  }
  