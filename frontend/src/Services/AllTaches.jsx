import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isEmpty } from "./utils";
import { useSelector } from "react-redux";
import Taches from "./Taches";

export default function AllTache() {
  const tasks = useSelector((state) => state.tacheReducer);
  localStorage.setItem("dataSelect", JSON.stringify(tasks));
  return (
    <div className="App">
      <h1>Liste des Taches API </h1>
      <div>
        <Link to="/">
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
            Retour
          </button>
        </Link>
        <Link to="/add">
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
            Ajouter une donnée
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
                <TableCell>Titre</TableCell>
                <TableCell>Auteur</TableCell>
                <TableCell>Details </TableCell>
                <TableCell>Durée</TableCell>
                <TableCell>supprimer</TableCell>
                <TableCell>Modifier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(tasks) &&
                tasks.map((e) => (
                  <Taches
                    key={e.id}
                    titre={e.titre}
                    auteur={e.auteur}
                    details={e.details}
                    duree={e.duree}
                    taskId={e.id}
                    // supp={deletetTaches}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
