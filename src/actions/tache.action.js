import axios from "axios";

export const GET_TACHE = "GET_TACHE";
export const ADD_TACHE = "ADD_TACHE";
export const EDIT_TACHE = "EDIT_TACHE";
export const GETONE_TACHE = "GETONE_TACHE";
export const DELETE_TACHE = "DELETE_TACHE";

export const getTaches = () => {
  return (dispatch) => {
    return axios.get("http://localhost:3000/taches").then((res) => {
      // console.log(res.data);
      dispatch({ type: GET_TACHE, payload: res.data });
    });
  };
};

export const getOneTaches = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:3000/taches/${id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: GETONE_TACHE, payload: res.data });
    });
  };
};

export const addTaches = (data) => {
  return (dispatch) => {
    return axios.post("http://localhost:3000/taches", data).then((res) => {
      // console.log(res.data);
      dispatch({ type: ADD_TACHE, payload: data });
    });
  };
};

export const editTaches = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:3000/taches/${data.id}`, data)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: EDIT_TACHE, payload: data });
      });
  };
};

export const deleteTaches = (dataId) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:3000/taches/${dataId}`)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: DELETE_TACHE, payload: dataId });
      });
  };
};
