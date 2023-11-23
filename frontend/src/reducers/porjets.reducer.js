import {
    ADD_PROJET,
    DELETE_PROJET,
    GETONE_PROJET,
    GET_PROJET,
    GETALL_PROJET,
  } from "../actions/projets.actions";
  
  const initialState = [];
  
  export default function projetReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PROJET:
        return action.payload;
      case GETALL_PROJET:
        return action.payload;
      case ADD_PROJET:
        return [action.payload, ...state];
      case GETONE_PROJET:
        return action.payload;
      case DELETE_PROJET:
        return state.filter((tache) => tache.id !== action.payload);
      default:
        return state;
    }
  }