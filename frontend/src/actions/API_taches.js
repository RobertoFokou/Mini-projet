import axios from "axios";

export const GET_TACHE_API = "GET_TACHE_API";
export const ADD_TACHE_API = "ADD_TACHE_API";
export const EDIT_TACHE_API = "EDIT_TACHE_API";
export const GETONE_TACHE_API = "GETONE_TACHE_API";
export const DELETE_TACHE_API = "DELETE_TACHE_API";

const user = JSON.parse(localStorage.getItem("login"));
const id = user._id;
export const getTachesAPI = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/taches/${id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: GET_TACHE_API, payload: res.data });
    });
  };
};

export const getOneTachesAPI = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/taches/${id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: GETONE_TACHE_API, payload: res.data });
    });
  };
};

export const addTachesAPI = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/api/taches/add", data)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: ADD_TACHE_API, payload: data });
      });
  };
};

export const editTachesAPI = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:5000/api/taches/${data.id}`, data)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: EDIT_TACHE_API, payload: data });
      });
  };
};

export const deleteTachesAPI = (dataId) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:5000/api/taches/${dataId}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: DELETE_TACHE_API, payload: dataId });
      });
  };
};
