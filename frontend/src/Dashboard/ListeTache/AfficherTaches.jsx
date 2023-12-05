import React from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { isEmpty } from "../../Services/utils";
import { useSelector } from "react-redux";
import TachesProjet from "./TacheListe";

export default function AfficherTachesProjet() {
  const tasks = useSelector((state) => state.ListeTachesReducer);
  localStorage.setItem("ListeTachesProjet", JSON.stringify(tasks));
  const params = useParams();
  const id = params.id;
  console.log(id);
  const dataSelect = JSON.parse(localStorage.getItem("projet"));
  console.log(dataSelect);
  const dataId = dataSelect.filter((el) => el._id === id)[0];
  console.log(dataId);
  localStorage.setItem("projetSelect", JSON.stringify(dataId));
  const dataIdSelect = JSON.parse(localStorage.getItem("projetSelect"));
  console.log(dataIdSelect);

  return (
    <div className="App">
      <h1>
        vous etes sur le projet  :{" "}
        <span style={{ color: "red" }}> {dataIdSelect.nom}</span>
      </h1>
      <div>
        <Link to="/dashbord/projet">
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
        <Link to="/dashbord/ajouterTachePrpjet">
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
                  <TachesProjet
                    key={e.id}
                    titre={e.titre}
                    auteur={e.auteur}
                    details={e.details}
                    duree={e.duree}
                    origine={e.projet.nom}
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
