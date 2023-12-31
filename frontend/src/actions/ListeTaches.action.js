import axios from "axios";

export const GET_TACHE_PROJET = "GET_TACHE_PROJET ";
export const GETALL_TACHE_PROJET = "GETALL_TACHE_PROJET";
export const ADD_TACHE_PROJET = "ADD_TACHE_PROJET";
export const EDIT_TACHE_PROJET = "EDIT_TACHE_PROJET";
export const GETONE_TACHE_PROJET = "GETONE_TACHE_PROJET";
export const DELETE_TACHE_PROJET = "DELETE_TACHE_PROJET";
const user = JSON.parse(localStorage.getItem("login"));

const id = user?._id;
// console.log(id2);
export const getTachesProjet = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/tachesProjet/${id}`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GET_TACHE_PROJET, payload: res.data });
      });
  };
};

const idProjet = JSON.parse(localStorage.getItem("idProjet"));
export const getAllTachesProjet = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/tachesProjet/${idProjet}`).then((res) => {
      console.log(res.data);
      dispatch({ type: GETALL_TACHE_PROJET, payload: res.data });
    });
  };
};

// Recupérer toutes les taches de la base de donnée
export const getOneTachesProjet = () => {
  return (dispatch) => {
    return axios
      .get(`http://localhost:5000/api/tachesProjet/`)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: GETONE_TACHE_PROJET, payload: res.data });
      });
  };
};

export const addTachesProjet = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/api/tachesProjet/add", data)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: ADD_TACHE_PROJET, payload: data });
      });
  };
};

export const editTachesProjet = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:5000/api/tachesProjet/${data.id}`, data)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: EDIT_TACHE_PROJET, payload: data });
      });
  };
};

export const deleteTachesProjet = (dataId) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:5000/api/tachesProjet/${dataId}`)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: DELETE_TACHE_PROJET, payload: dataId });
      });
  };
};

