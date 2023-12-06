import axios from "axios";

export const GET_PROJET = "GET_PROJET";
export const GETALL_PROJET = "GETALL_PROJET";
export const ADD_PROJET = "ADD_PROJET";
export const EDIT_PROJET = "EDIT_PROJET";
export const GETONE_PROJET = "GETONE_PROJET";
export const DELETE_PROJET = "DELETE_PROJET";

const user = JSON.parse(localStorage.getItem("login"));
const id = user?._id;
export const getProjets = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/projets/${id}`).then((res) => {
      // console.log(res.data);
      dispatch({ type: GET_PROJET, payload: res.data });
    });
  };
};

export const getAllProjets = () => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/projets/`).then((res) => {
      // console.log(res.data);
      dispatch({ type: GETALL_PROJET, payload: res.data });
    });
  };
};

export const getOneProjets = (id) => {
  return (dispatch) => {
    return axios.get(`http://localhost:5000/api/projets/${id}`).then((res) => {
      console.log(res.data);
      dispatch({ type: GETONE_PROJET, payload: res.data });
    });
  };
};

export const addProjets = (data) => {
  return (dispatch) => {
    return axios
      .post("http://localhost:5000/api/projets/add", data)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: ADD_PROJET, payload: data });
      });
  };
};

export const editProjets = (data) => {
  return (dispatch) => {
    return axios
      .put(`http://localhost:5000/api/projets/${data.id}`, data)
      .then((res) => {
        console.log(res.data);
        dispatch({ type: EDIT_PROJET, payload: data });
      });
  };
};

export const deleteProjets = (dataId) => {
  return (dispatch) => {
    return axios
      .delete(`http://localhost:5000/api/projets/${dataId}`)
      .then((res) => {
        // console.log(res.data);
        dispatch({ type: DELETE_PROJET, payload: dataId });
      });
  };
};