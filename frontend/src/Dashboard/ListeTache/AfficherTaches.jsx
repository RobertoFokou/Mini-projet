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
import { isEmpty } from "../../Services/utils";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TachesProjet from "./TacheListe";
import TacheKanban from "./TacheKanban";
import { updateTacheStatut } from "../../actions/Types_Actions";

export default function AfficherTachesProjet() {
  const dispatch = useDispatch();
  const deplacerTache = (taskId, newStatut) => {
    dispatch(updateTacheStatut(taskId, newStatut));
    const tacheDeplacee = tacheProjetSelect.find(
      (tache) => tache._id === taskId
    );
    if (tacheDeplacee) {
      // Mettez à jour le statut de la tâche
      const tacheMiseAJour = { ...tacheDeplacee, statut: newStatut };
      console.log(tacheMiseAJour);
      console.log(tacheDeplacee);
      dispatch(updateTacheStatut(tacheMiseAJour));
    }
  };
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
  localStorage.setItem("tacheProjetSelect", JSON.stringify(tacheProjetSelect));

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <h1>
          vous êtes sur le projet :{" "}
          <span style={{ color: "red" }}> {dataIdSelect.nom}</span>
        </h1>
        <br />
        <h2>
          Ce projet contient :{" "}
          <span style={{ color: "red" }}> {tacheProjetSelect.length}</span>{" "}
          Taches
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
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{ backgroundColor: "#05153f" }}>
                  <TableRow>
                    <TableCell style={{ color: "white" }}>Backlog</TableCell>
                    <TableCell style={{ color: "white" }}>A traiter</TableCell>
                    <TableCell style={{ color: "white" }}>En cours </TableCell>
                    <TableCell style={{ color: "white" }}>En Test</TableCell>
                    <TableCell style={{ color: "white" }}>Terminer</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {tacheProjetSelect
                        .filter((tache) => tache.statut === "Backlog")
                        .map((tache) => (
                          <TacheKanban
                            key={tache._id}
                            titre={tache.titre}
                            auteur={tache.auteur}
                            details={tache.details}
                            duree={tache.duree}
                            statut={tache.statut}
                            taskId={tache._id}
                            deplacerTache={deplacerTache}
                          />
                        ))}
                    </TableCell>
                    <TableCell>
                      {tacheProjetSelect
                        .filter((tache) => tache.statut === "A traiter")
                        .map((tache) => (
                          <TacheKanban
                            key={tache._id}
                            titre={tache.titre}
                            auteur={tache.auteur}
                            details={tache.details}
                            duree={tache.duree}
                            statut={tache.statut}
                            taskId={tache._id}
                            deplacerTache={deplacerTache}
                          />
                        ))}
                    </TableCell>
                    <TableCell>
                      {tacheProjetSelect
                        .filter((tache) => tache.statut === "En cours")
                        .map((tache) => (
                          <TacheKanban
                            key={tache._id}
                            titre={tache.titre}
                            auteur={tache.auteur}
                            details={tache.details}
                            duree={tache.duree}
                            statut={tache.statut}
                            taskId={tache._id}
                            deplacerTache={deplacerTache}
                          />
                        ))}
                    </TableCell>
                    <TableCell>
                      {tacheProjetSelect
                        .filter((tache) => tache.statut === "En Test")
                        .map((tache) => (
                          <TacheKanban
                            key={tache._id}
                            titre={tache.titre}
                            auteur={tache.auteur}
                            details={tache.details}
                            duree={tache.duree}
                            statut={tache.statut}
                            taskId={tache._id}
                            deplacerTache={deplacerTache}
                          />
                        ))}
                    </TableCell>
                    <TableCell>
                      {tacheProjetSelect
                        .filter((tache) => tache.statut === "Terminer")
                        .map((tache) => (
                          <TacheKanban
                            key={tache._id}
                            titre={tache.titre}
                            auteur={tache.auteur}
                            details={tache.details}
                            duree={tache.duree}
                            statut={tache.statut}
                            taskId={tache._id}
                            deplacerTache={deplacerTache}
                          />
                        ))}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </DndProvider>
  );
}
