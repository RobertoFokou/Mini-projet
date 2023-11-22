import axios from "axios";
export const EDIT_USER_API ="EDIT_USER_API";

export const editUsersAPI = (data) => {
    return (dispatch) => {
      return axios
        .put(`http://localhost:5000/api/users/${data.id}`, data)
        .then((res) => {
          console.log(res.data);
          dispatch({ type: EDIT_USER_API, payload: data });
        });
    };
  };