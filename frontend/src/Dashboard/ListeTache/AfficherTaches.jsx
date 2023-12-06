import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Select, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import { isEmpty } from "../../Services/utils";
import { useSelector } from "react-redux";
import TachesProjet from "./TacheListe";
import TacheKanban from "./TacheKanban";

export default function AfficherTachesProjet() {
  const [choix, setChoix] = useState("Liste");
  const [isKanban, setIsKanban] = useState(true);

  function handleChoix(e) {
    setChoix(e.target.value);
    setIsKanban(e.target.value === "Liste");
  }

  const params = useParams();
  const id = params.id;
  const dataSelect = JSON.parse(localStorage.getItem("projet"));
  const dataId = dataSelect.filter((el) => el._id === id)[0];
  localStorage.setItem("projetSelect", JSON.stringify(dataId));
  const dataIdSelect = JSON.parse(localStorage.getItem("projetSelect"));

  // Filter les taches et afficher les taches en fonction du projet
  const tasks = useSelector((state) => state.ListeTachesReducer);
  localStorage.setItem("ListeTachesProjet", JSON.stringify(tasks));
  const id2 = params.id;
  const tacheProjetSelect = tasks.filter((el) => el.projet?._id === id2);
  console.log(tacheProjetSelect);
  localStorage.setItem("tacheProjetSelect", JSON.stringify(tacheProjetSelect));

  return (
    <div className="App">
      <h1>
        vous êtes sur le projet :{" "}
        <span style={{ color: "red" }}> {dataIdSelect.nom}</span>
      </h1>
      <br />
      <h2>
        Ce projet contient :{" "}
        <span style={{ color: "red" }}> {tacheProjetSelect.length}</span> Taches
      </h2>
      <br />
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
            Ajouter une Tache
          </button>
        </Link>
        <br />
        <br />
        <div
          style={{
            width: "10%",
            marginLeft: "20%",
            marginTop: "-60px",
            display: "flex",
            gap: "40px",
          }}
        >
          <p>Mode d'affichage : </p>
          <Select
            value={choix}
            onChange={handleChoix}
            style={{ width: "100%" }}
          >
            <MenuItem value={"Liste"}>Liste</MenuItem>
            <MenuItem value={"Kanban"}>Kanban</MenuItem>
          </Select>
        </div>
      </div>
      <br />
      <br />

      {isKanban ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "red" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>Nom</TableCell>
                  <TableCell style={{ color: "white" }}>Objectifs</TableCell>
                  <TableCell style={{ color: "white" }}>Details </TableCell>
                  <TableCell style={{ color: "white" }}>Durée</TableCell>
                  <TableCell style={{ color: "white" }}>Statut</TableCell>
                  <TableCell style={{ color: "white" }}>supprimer</TableCell>
                  <TableCell style={{ color: "white" }}>Modifier</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isEmpty(tacheProjetSelect) &&
                  tacheProjetSelect.map((e) => (
                    <TachesProjet
                      key={e.id}
                      titre={e.titre}
                      auteur={e.auteur}
                      details={e.details}
                      duree={e.duree}
                      origine={e.statut}
                      taskId={e._id}
                      // supp={deletetTaches}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div style={{ cursor: "pointer" }}>
          <Grid container spacing={2}>
            {tacheProjetSelect.map((e) => (
              <Grid item xs={12} sm={6} md={4} key={e.id}>
                {/* Affichez les détails du projet dans une carte ou un composant de Kanban */}
                <TacheKanban
                  titre={e.titre}
                  auteur={e.auteur}
                  details={e.details}
                  duree={e.duree}
                  origine={e.statut}
                  taskId={e._id}
                />
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </div>
  );
}
