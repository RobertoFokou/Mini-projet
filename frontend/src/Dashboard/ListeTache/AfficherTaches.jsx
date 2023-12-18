import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Select, MenuItem, Grid, Card, CardContent } from "@mui/material";
import { isEmpty } from "../../Services/utils";
// import { Grid, Card, CardContent } from '@material-ui/core';

// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import TachesProjet from "./TacheListe";
import TacheKanban from "./TacheKanban";
// import { updateTacheStatut } from "../../actions/Types_Actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import axios from "axios";

export default function AfficherTachesProjet() {
  // window.location.reload();
  // const dispatch = useDispatch();
  // const deplacerTache = (taskId, newStatut) => {
  //   dispatch(updateTacheStatut(taskId, newStatut));
  //   const tacheDeplacee = tasks.find((tache) => tache._id === taskId);
  //   if (tacheDeplacee) {
  //     // Mettez à jour le statut de la tâche
  //     const tacheMiseAJour = { ...tacheDeplacee, statut: newStatut };
  //     // console.log(tacheMiseAJour);
  //     // console.log(tacheDeplacee);
  //     dispatch(updateTacheStatut(tacheMiseAJour));
  //   }
  // };

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

  const [data, setData] = useState({});

  const id2 = params.id;
  console.log(id2);
  localStorage.setItem("idProjet", JSON.stringify(id2));
  useEffect(() => {
    const idProjet = JSON.parse(localStorage.getItem("idProjet"));
    console.log(idProjet);
    axios
      .get(`http://localhost:5000/api/tachesProjet/${idProjet}`)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("tacheIdProjetSelect", JSON.stringify(res.data));
        const updatedTasks = JSON.parse(
          localStorage.getItem("tacheIdProjetSelect")
        );
        // Mettre à jour la constante "tasks" avec les nouvelles données
        setTasks(updatedTasks);
      });
  }, []);

  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tacheIdProjetSelect"))
  );
  console.log(tasks);
  // console.log(data);

  // Fonction pour gérer le porté deposé
  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    console.log("destination: ", destination);
    console.log("source: ", source);
    console.log("draggableId", draggableId);
    console.log("source.index", source.index);
    console.log("source.droppableId", source.droppableId);
    console.log("destination.index", destination.index);
    console.log(data);

    // const newData = [...data];
    const newData = { ...tasks };
    console.log(" tableau d'objet copié", newData);

    // Pour connaitre la colonne dans laquelle on se trouve
    const dataColumn = newData[source.droppableId]
    console.log("colonne ou on a bougée une tache", dataColumn);

    // pour avoir la tâche bougé dans la colonne oû on se trouve
    const column = dataColumn.find((el) => el._id === draggableId);

    console.log("tâche bougée", column);

    // Trouver l'index de l'élément "column" dans le tableau "dataColumn"
    const columnIndex = dataColumn.findIndex((el) => el._id === draggableId);

    // Vérifier si l'élément a été trouvé avant de le supprimer
      // Utilisons la méthode splice() pour supprimer l'élément à l'index columnIndex
      const newDataColumn = [...dataColumn]; // Créer une copie du tableau dataColumn
      const removedItem = newDataColumn.splice(columnIndex, 1); // Supprimer 1 élément à l'index columnIndex
      console.log(" élément supprimé :", removedItem);
      console.log(" dataColumn après la suppression :", newDataColumn);


      // Vérifier si destination.index est valide pour insérer l'élément supprimé
        // Utiliser la méthode splice() pour insérer l'élément supprimé à la nouvelle position
        newDataColumn.splice(destination.index, 0, removedItem[0]);

        console.log(
          "Nouveau tableau dataColumn après la suppression et le déplacement :",
          newDataColumn
        );

        newData[source.droppableId] = newDataColumn

        setTasks({...newData})
    return;
  };

  return (
    <div className="App">
      <h1>
        vous êtes sur le projet :{" "}
        <span style={{ color: "red" }}> {dataIdSelect.nom}</span>
      </h1>
      <br />
      <h2>
        Ce projet contient :{" "}
        <span style={{ color: "red" }}> {Object.keys(tasks).length}</span>{" "}
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
                {!isEmpty(tasks) &&
                  Object.keys(tasks).map((e) => {
                    return tasks[e].map((task) => (
                      <TachesProjet
                        key={task._id}
                        titre={task.titre}
                        auteur={task.auteur}
                        details={task.details}
                        duree={task.duree}
                        origine={task.statut}
                        taskId={task._id}
                        // supp={deletetTaches}
                      />
                    ));
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Grid
              container
              spacing={2}
              style={{
                border: "1px solid lightgrey",
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
                borderRadius: "10px",
              }}
            >
              {" "}
              {Object.keys(tasks).map((e) => (
                <Grid style={{ display: "flex", gap: "50px" }}>
                  <Card>
                    <CardContent>
                      <p>{e}</p>
                      <Droppable droppableId={e}>
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {tasks[e].map((task, index) => (
                              <TacheKanban
                                key={task._id}
                                titre={task.titre}
                                auteur={task.auteur}
                                details={task.details}
                                duree={task.duree}
                                statut={task.statut}
                                taskId={task._id}
                                index={index}
                                // supp={deletetTaches}
                              />
                            ))}
                          </div>
                        )}
                      </Droppable>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </DragDropContext>
        </div>
      )}
    </div>
  );
}
