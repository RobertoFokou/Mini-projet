import React, { useState } from "react";
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
import { Select, MenuItem } from "@mui/material";
import { Grid } from "@mui/material";
import ProjetBd from "./ProjetsAPI";
import ProjetKanban from "./ProjetKanban";

export default function AfficherProjet() {
  const [choix, setChoix] = useState("Liste");
  const [isKanban, setIsKanban] = useState(true);

  function handleChoix(e) {
    setChoix(e.target.value);
    setIsKanban(e.target.value === "Liste");
  }
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
        <div
          style={{
            width: "10%",
            marginLeft: "20%",
            marginTop: "-40px",
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
        <br />
        <br />
      </div>
      {isKanban ? (
        <div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "red" }}>
                <TableRow>
                  <TableCell style={{ color: "white" }}>
                    Nom du Projet
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Description </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Date Création
                  </TableCell>
                  <TableCell style={{ color: "white" }}>
                    Date Livraison
                  </TableCell>
                  <TableCell style={{ color: "white" }}>Auteur</TableCell>
                  <TableCell style={{ color: "white" }}>supprimer</TableCell>
                  <TableCell style={{ color: "white" }}>Modifier</TableCell>
                  <TableCell style={{ color: "white" }}>Taches</TableCell>
                  <TableCell style={{ color: "white" }}>Memrbres</TableCell>

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
      ) : (
        <div style={{cursor: "pointer"}}>
          <Grid container spacing={2}>
            {tasks.map((e) => (
              <Grid item xs={12} sm={6} md={4} key={e.id}>
                {/* Affichez les détails du projet dans une carte ou un composant de Kanban */}
                <ProjetKanban
                  description={e.nom}
                  details={e.details}
                  dateCreation={e.dateCreation}
                  dateLivraison={e.dateLivraison}
                  origine={e.developpeur.nom}
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
