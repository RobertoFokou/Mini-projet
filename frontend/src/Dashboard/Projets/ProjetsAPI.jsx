import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../styles/TachesAPI.css";
import { TextField } from "@mui/material";
import axios from "axios";
import {
  deleteProjets,
  editProjets,
  getProjets,
} from "../../actions/projets.actions";

export default function ProjetBd({
  description,
  dateCreation,
  dateLivraison,
  details,
  origine,
  taskId,
}) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updateTitre, setUpdateTitre] = useState(dateCreation);
  const [updateDetails, setUpdateDetail] = useState(details);
  const [updateDuree, setUpdateDuree] = useState(dateLivraison);
  const [updateAuteur, setUpdateAuteur] = useState(description);
  const [show, setShow] = useState(false);

  const resetForm = () => {
    setUpdateTitre(dateCreation);
    setUpdateDetail(details);
    setUpdateDuree(dateLivraison);
    setUpdateAuteur(description);
    setShow(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateTaches = {
      dateCreation: updateTitre,
      description: updateAuteur,
      details: updateDetails,
      dateLivraison: updateDuree,
      id: taskId,
    };
    await dispatch(editProjets(updateTaches));
    dispatch(getProjets());
    window.location.reload();
    resetForm();
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const removeItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/projets/${id}`)
      .then((res) => {
        console.log("suppression reussie");
        console.log(id);
      })
      .catch((error) => {
        console.log("erreur lors la suppression");
        console.log(id);
        console.log(error);
      });
  };

  const handleConfirmDelete = () => {
    removeItem(taskId);
    window.location.reload();
    dispatch(deleteProjets(taskId));
    dispatch(getProjets());
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <TableRow>
      <TableCell style={{ cursor: "pointer" }}>
        {show && (
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Nom du prjet : "
            variant="outlined"
            type="date"
            value={updateTitre}
            onChange={(e) => setUpdateTitre(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && (
          <span onDoubleClick={() => setShow(true)}>{description}</span>
        )}
      </TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        {" "}
        {show && (
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Auteur : "
            variant="outlined"
            type="text"
            value={updateAuteur}
            onChange={(e) => setUpdateAuteur(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && (
          <span onDoubleClick={() => setShow(true)}>{details}</span>
        )}
      </TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        {show && (
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Details : "
            variant="outlined"
            type="text"
            value={updateDetails}
            onChange={(e) => setUpdateDetail(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && <span onDoubleClick={() => setShow(true)}>{dateCreation}</span>}
      </TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        {show && (
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Durée "
            variant="outlined"
            type="date"
            value={updateDuree}
            onChange={(e) => setUpdateDuree(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && (
          <span onDoubleClick={() => setShow(true)}>{dateLivraison}</span>
        )}
      </TableCell>
      <TableCell>{origine}</TableCell>
      <TableCell>
        {confirmDelete ? (
          <div className="dialog-overlay" onClick={handleCancelDelete}>
            <div className="dialog-content">
              <p>Êtes-vous sûr de vouloir supprimer cette tâche ?</p>
              <div className="dialog-buttons">
                <button
                  onClick={handleCancelDelete}
                  style={{ cursor: "pointer", margin: "20px" }}
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmDelete}
                  style={{ cursor: "pointer" }}
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        ) : (
          <DeleteIcon
            style={{ cursor: "pointer" }}
            onClick={handleDeleteClick}
          />
        )}
      </TableCell>
      <TableCell>
        {!show && (
          <Link to={"/dashbord/update/" + taskId}>
            <ModeEditIcon style={{ cursor: "pointer" }} />
          </Link>
        )}
        {show && (
          <span style={{ cursor: "pointer" }} onClick={handleUpdate}>
            <AssignmentTurnedInIcon />
          </span>
        )}
      </TableCell>
      <TableCell>
        <span>voir plus</span>
      </TableCell>
    </TableRow>
  );
}
