import { EDIT_USER_API } from "../actions/API_user";

const initialState = [];

export default function tacheUserAPI(state = initialState, action) {
  switch (action.type) {
    case EDIT_USER_API:
      return action.payload;
    default:
      return state;
  }
}
