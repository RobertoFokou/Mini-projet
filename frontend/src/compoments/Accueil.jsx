import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Taks from "./Taks";
import TaskContext from "./TaskContext";
// import { useSelector } from "react-redux";

export default function Accueil() {
  // const taches = useSelector((state) => state.tacheReducer);
  const { tache, deleteTask } = useContext(TaskContext);
  return (
    <div className="App">
      <h1>Liste des Taches </h1>
      <div>
        <Link to="ajouter">
          <button
            type="button"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "blue",
              fontSize: "14px",
              margin: "10px",
            }}
          >
            Ajouter une nouvelle tache
          </button>
        </Link>
        <Link to="gerer">
          <button
            type="button"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "blue",
              fontSize: "14px",
            }}
          >
            Gerer les tâches d'API
          </button>
        </Link>
        <br />
        <br />
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nom</TableCell>
                <TableCell>Titre </TableCell>
                <TableCell>completed </TableCell>
                <TableCell>supprimer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tache.map((e) => (
                <Taks
                  key={e.id}
                  titre={e.title}
                  nom={e.nom}
                  taskId={e.id}
                  supp={deleteTask}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
