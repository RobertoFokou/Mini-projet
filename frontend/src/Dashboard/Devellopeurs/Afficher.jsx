import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isEmpty } from "../../Services/utils";
import { useSelector } from "react-redux";
// import Taches from "./Taches";
import TachesBd from "./TachesAPI";

export default function AfficherTaches() {
  // const user = JSON.parse(localStorage.getItem("login"));
  const tasks = useSelector((state) => state.tacheReducerAPI);
  localStorage.setItem("dataSelectAPI", JSON.stringify(tasks));
  return (
    <div className="App">
      <h1>
        Nombre total de tâche :{" "}
        <span style={{ color: "red" }}> {tasks.length}</span>
      </h1>
      <div>
        <Link to="/index">
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
            <TableHead style={{ backgroundColor: "red" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Titre</TableCell>
                <TableCell style={{ color: "white" }}>Oringine</TableCell>
                <TableCell style={{ color: "white" }}>Details </TableCell>
                <TableCell style={{ color: "white" }}>Durée</TableCell>
                <TableCell style={{ color: "white" }}>Auteur</TableCell>
                <TableCell style={{ color: "white" }}>supprimer</TableCell>
                <TableCell style={{ color: "white" }}>Modifier</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(tasks) &&
                tasks.map((e) => (
                  <TachesBd
                    key={e.id}
                    titre={e.titre}
                    auteur={e.auteur}
                    details={e.details}
                    duree={e.duree}
                    origine={e.developpeur.nom}
                    taskId={e._id}
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
