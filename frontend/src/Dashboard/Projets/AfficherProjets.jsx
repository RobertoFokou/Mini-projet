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
import ProjetBd from "./ProjetsAPI";

export default function AfficherProjet() {
  // const user = JSON.parse(localStorage.getItem("login"));
  const tasks = useSelector((state) => state.projetReducer);
  localStorage.setItem("projet", JSON.stringify(tasks));
  return (
    <div className="App">
      <h1>
        Nombre total de projets :{" "}
        <span style={{ color: "red" }}> {tasks.length}</span>
      </h1>
      <div>
        <Link to="/dashbord/statistique">
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
        <Link to="/dashbord/ajouter">
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
            Ajouter un projet
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
                <TableCell style={{ color: "white" }}>Nom du Projet</TableCell>
                <TableCell style={{ color: "white" }}>Description </TableCell>
                <TableCell style={{ color: "white" }}>Date Création</TableCell>
                <TableCell style={{ color: "white" }}>Date Livraison</TableCell>
                <TableCell style={{ color: "white" }}>Auteur</TableCell>
                <TableCell style={{ color: "white" }}>supprimer</TableCell>
                <TableCell style={{ color: "white" }}>Modifier</TableCell>
                <TableCell style={{ color: "white" }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(tasks) &&
                tasks.map((e) => (
                  <ProjetBd
                    key={e.id}
                    description={e.nom}
                    details={e.details}
                    dateCreation={e.dateCreation}
                    dateLivraison={e.dateLivraison}
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
