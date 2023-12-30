import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import "../styles/TachesAPI.css";
import { deleteTachesAPI, getTachesAPI } from "../../actions/API_taches";
import axios from "axios";
import { baseRoot } from "../../Services/utils";

export default function UserBd({
  nom,
  prenom,
  numero,
  email,
  privilege,
  photo,
  taskId,
}) {
  const dispatch = useDispatch();
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDeleteClick = () => {
    setConfirmDelete(true);
  };

  const removeItem = (id) => {
    axios
      .delete(`http://localhost:5000/api/taches/${id}`)
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
    dispatch(deleteTachesAPI(taskId));
    dispatch(getTachesAPI());
    setConfirmDelete(false);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <TableRow>
      <TableCell>{nom}</TableCell>
      <TableCell>{prenom}</TableCell>
      <TableCell>{numero}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{privilege}</TableCell>
      <TableCell>
        {" "}
        <img
          src={`${baseRoot}/${photo}`}
          style={{
            width: "40px",
            height: "40px",
            flexShrink: "0",
            borderRadius: "50px",
          }}
          alt=""
        />{" "}
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
      {/* <TableCell>
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
      </TableCell> */}
    </TableRow>
  );
}
