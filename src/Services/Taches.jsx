import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Link } from "react-router-dom";
import { deleteTaches } from "../actions/tache.action";
import { useDispatch } from "react-redux";
import "../styles/Taches.css";
export default function Taches({ titre, auteur, details, duree, taskId }) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

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
      <TableCell style={{ cursor: "pointer" }}>{titre}</TableCell>
      <TableCell>{auteur}</TableCell>
      <TableCell>{details}</TableCell>
      <TableCell>{duree}</TableCell>
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
        <Link to={"update/" + taskId}>
          <ModeEditIcon style={{ cursor: "pointer" }} />
        </Link>
      </TableCell>
    </TableRow>
  );
}
