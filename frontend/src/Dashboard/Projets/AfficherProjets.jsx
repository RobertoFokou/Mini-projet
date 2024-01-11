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
import "../styles/ViewProjet.css";

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
    <div style={{ marginTop: "20px" }}>
      <div
        style={{
          // border: "2px solid red",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          padding: "10px 5px",
        }}
      >
        <div>
          <Link to="/dashbord/statistique">
            <i
              class="fa-solid fa-circle-arrow-left"
              style={{ cursor: "pointer", fontSize: "20px" }}
            ></i>
          </Link>
          <span
            style={{
              border: "none",
              padding: "8px",
              color: "black",
              fontSize: "18px",
              fontWeight: "bold",
              // margin: "10px",
            }}
          >
            Mes projets
          </span>
        </div>
        <div
          style={{
            width: "10%",
            marginLeft: "20%",
            marginLeft: "65%",
            display: "flex",
            gap: "40px",
          }}
        >
          <p>Mode d'affichage : </p>
          <div>
            {" "}
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
      </div>
      {isKanban ? (
        <div style={{ borderRadius: "8px", backgroundColor: "white" }}>
          <div
            style={{
              // border: "2px solid red",
              padding: "20px 10px",
              display: "flex",
              gap: "20px",
            }}
          >
            {/* Ajout d'un new peojet */}
            <div>
              <Link to="/dashbord/ajouter">
                <button
                  className="btn"
                  style={{
                    cursor: "pointer",
                    borderRadius: "3px",
                    // padding: "13px",
                  }}
                >
                  Créer un nouveau projet
                </button>
              </Link>
            </div>{" "}
            {/* Importation et exportation de projet */}
            <div>
              <button
                className="btn"
                style={{
                  cursor: "pointer",
                  borderRadius: "3px",
                  // padding: "10px",
                }}
              >
                Importer une liste de projets
              </button>
            </div>{" "}
            {/* Rechercher un projet */}
            <div className="seach">
              <input type="texte" placeholder="Rechercher...."></input>
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {/* Nombre de projets trouvés */}
            <div
              style={{
                // border: "2px solid yellow",
                marginLeft: "25%",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  color: "black",
                  fontSize: "18px",
                  fontWeight: "bold",
                  // border: "2px solid red",
                  margin: "auto 0",
                }}
              >
                {tasks.length} projets trouvés
              </span>
            </div>
          </div>
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#fafafa" }}>
                <TableRow>
                  <TableCell style={{ color: "black" }}>
                    Nom du Projet
                  </TableCell>
                  <TableCell style={{ color: "black" }}>Description </TableCell>
                  <TableCell style={{ color: "black" }}>
                    Date Création
                  </TableCell>
                  <TableCell style={{ color: "black" }}>
                    Date Livraison
                  </TableCell>
                  <TableCell style={{ color: "black" }}>Auteur</TableCell>
                  <TableCell style={{ color: "black" }}>Membres</TableCell>
                  {/* <TableCell style={{ color: "black" }}>Modifier</TableCell> */}
                  <TableCell style={{ color: "black" }}>Taches</TableCell>
                  <TableCell style={{ color: "black" }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {!isEmpty(tasks) &&
                  tasks.map((e, index) => (
                    <ProjetBd
                      key={e.id}
                      description={e.nom}
                      details={e.details}
                      dateCreation={e.dateCreation}
                      dateLivraison={e.dateLivraison}
                      origine={e.developpeur.nom}
                      taskId={e._id}
                      // style={{
                      //   backgroundColor:
                      //     index % 2 === 0 ? "white" : "lightgray",
                      // }}
                    />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div style={{ cursor: "pointer" }}>
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
