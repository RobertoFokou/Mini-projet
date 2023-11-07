import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import { Link} from "react-router-dom";
import { deleteTaches, editTaches, getTaches } from "../actions/tache.action";
import { useDispatch } from "react-redux";
import "../styles/Taches.css";
import { TextField } from "@mui/material";

export default function Taches({ titre, auteur, details, duree, taskId }) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [updateTitre, setUpdateTitre] = useState(titre);
  const [updateDetails, setUpdateDetail] = useState(details);
  const [updateDuree, setUpdateDuree] = useState(duree);
  const [updateAuteur, setUpdateAuteur] = useState(auteur);
  const [show, setShow] = useState(false);

  const resetForm = () => {
    setUpdateTitre(titre);
    setUpdateDetail(details);
    setUpdateDuree(duree);
    setUpdateAuteur(auteur);
    setShow(false);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updateTaches = {
      titre: updateTitre,
      auteur: updateAuteur,
      details: updateDetails,
      duree: updateDuree,
      id: taskId
    };
    await dispatch(editTaches(updateTaches));
    dispatch(getTaches());
    // window.location.reload();
    resetForm ()
  };

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTaches(taskId));
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
            label="Titre : "
            variant="outlined"
            type="text"
            value={updateTitre}
            onChange={(e) => setUpdateTitre(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && <span onDoubleClick={() => setShow(true)}>{titre}</span>}
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
        {!show && <span onDoubleClick={() => setShow(true)}>{auteur}</span>}
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
        {!show && <span onDoubleClick={() => setShow(true)}>{details}</span>}
      </TableCell>
      <TableCell style={{ cursor: "pointer" }}>
        {show && (
          <TextField
            className="input-field"
            id="outlined-basic"
            label="Durée "
            variant="outlined"
            type="text"
            value={updateDuree}
            onChange={(e) => setUpdateDuree(e.target.value)}
            // onBlur={() => setShow(false)}
          />
        )}
        {!show && <span onDoubleClick={() => setShow(true)}>{duree}</span>}
      </TableCell>
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
          <Link to={"update/" + taskId}>
            <ModeEditIcon style={{ cursor: "pointer" }} />
          </Link>
        )}
        {show && (
          <span onClick={handleUpdate} style={{ cursor: "pointer" }}>
            <AssignmentTurnedInIcon />
          </span>
        )}
      </TableCell>
    </TableRow>
  );
}
