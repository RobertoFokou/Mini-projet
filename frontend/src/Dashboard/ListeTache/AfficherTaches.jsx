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

  // const [data, setData] = useState({});

  const id2 = params.id;
  useEffect(() => {
    axios.get(`http://localhost:5000/api/tachesProjet/${id2}`).then((res) => {
      // Mettre à jour la constante "tasks" avec les nouvelles données
      const data = res.data;
      setTasks(data);
    });
  }, [id2]);

  const [tasks, setTasks] = useState({});
  console.log(tasks);
  localStorage.setItem("tacheProjetSelect", JSON.stringify(tasks))
  const tailleBacklog = tasks["Backlog"]?.length;
  const tailleATraiter = tasks["A Traiter"]?.length;
  const tailleCours = tasks["En Cours"]?.length;
  const tailleTest = tasks["En Test"]?.length;
  const tailleTerminer = tasks["Terminer"]?.length;
  const finalTaille =
    tailleBacklog + tailleATraiter + tailleCours + tailleTest + tailleTerminer;


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

    const newData = { ...tasks };

    const sourceColumn = newData[source.droppableId];

    const destinationColumn = newData[destination.droppableId];

    if (sourceColumn === destinationColumn) {
      const columnIndex = sourceColumn.findIndex(
        (el) => el._id === draggableId
      );

      const newDataSourceColumn = [...sourceColumn];
      const removedItem = newDataSourceColumn.splice(columnIndex, 1);

      if (destinationColumn.length === 0) {
        newDataSourceColumn.push(removedItem[0]);
      } else {
        newDataSourceColumn.splice(destination.index, 0, removedItem[0]);
      }

      newData[source.droppableId] = newDataSourceColumn;

      setTasks({ ...newData });
      return;
    } else {
      const columnIndex = sourceColumn.findIndex(
        (el) => el._id === draggableId
      );

      const newDataSourceColumn = [...sourceColumn];
      const newDataSourceDestination = [...destinationColumn];

      const removedItem = newDataSourceColumn.splice(columnIndex, 1);

      if (destinationColumn.length === 0) {
        newDataSourceDestination.push(removedItem[0]);
      } else {
        newDataSourceDestination.splice(destination.index, 0, removedItem[0]);
      }

      newData[destination.droppableId] = newDataSourceDestination;
      newData[source.droppableId] = newDataSourceColumn;
      setTasks({ ...newData });
      return;
    }
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
        <span style={{ color: "red" }}> {finalTaille}</span>{" "}
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
                backgroundColor:"rgb(210, 210, 230)",
                padding: "10px",
                borderRadius: "10px",
              }}
            >
              {" "}
              {Object.keys(tasks).map((e) => (
                <Grid>
                  <Card style={{ width: "15vw" }}>
                    <CardContent>
                      <p>{e}</p>
                      <Droppable droppableId={e}>
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                            style={{
                              display: "flex",
                              // overflow: "auto",
                              alignItems: "center",
                              padding: "10px 15px 0",
                              flexDirection: "column",
                            }}
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
