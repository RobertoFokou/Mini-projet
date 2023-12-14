import React, { useEffect, useState } from "react";
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
import { useSelector } from "react-redux";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
import TachesProjet from "./TacheListe";
import TacheKanban from "./TacheKanban";
// import { updateTacheStatut } from "../../actions/Types_Actions";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export default function AfficherTachesProjet() {
  // window.location.reload();
  // const dispatch = useDispatch();
  // const deplacerTache = (taskId, newStatut) => {
  //   dispatch(updateTacheStatut(taskId, newStatut));
  //   const tacheDeplacee = data.find((tache) => tache._id === taskId);
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

  // Filter les taches et afficher les taches en fonction du projet
  const tasks = useSelector((state) => state.ListeTachesReducer);
  console.log(tasks);
  const [data, setData] = useState({});

  const id2 = params.id;
  console.log(id2);
  localStorage.setItem("idProjet", JSON.stringify(id2));

  // useEffect(() => {
  //   console.log(tasks);
  //   localStorage.setItem("ListeTachesProjet", JSON.stringify(tasks));
  //   const id2 = params.id;
  //   console.log(id2);
  //   const tacheProjetSelect = tasks.filter((el) => el.projet?._id === id2);
  //   console.log( "taches correspondant au projet", tacheProjetSelect);
  //   localStorage.setItem(
  //     "tacheProjetSelect",
  //     JSON.stringify(tacheProjetSelect)
  //   );
  //   const storedData = localStorage.getItem("tacheProjetSelect");

  //   console.log("executed", tacheProjetSelect);
  //   if (storedData) {
  //     const parsedData = JSON.parse(storedData);
  //     setData(parsedData);
  //   }
  // }, [tasks, params.id]);
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

    const newData = [...data];
    console.log(" tableau copié", newData);
    // Pour connaitre la colonne dans laquelle on se trouve
    const dataColumn = data.filter(
      (tache) => tache.statut === source.droppableId
    );
    console.log("colonne ou on a bougée une tache", dataColumn);

    // pour avoir la tâche bougé dans la colonne oû on se trouve
    const column = newData.find((el) => el._id === draggableId);

    console.log("tâche bougée", column);

    // Trouver l'index de l'élément "column" dans le tableau "dataColumn"
    const columnIndex = dataColumn.findIndex((el) => el._id === draggableId);

    // Vérifier si l'élément a été trouvé avant de le supprimer
    if (columnIndex !== -1) {
      // Utiliser la méthode splice() pour supprimer l'élément à l'index columnIndex
      const newDataColumn = [...dataColumn]; // Créer une copie du tableau dataColumn
      const removedItem = newDataColumn.splice(columnIndex, 1); // Supprimer 1 élément à l'index columnIndex
      console.log(" dataColumn après la suppression :", removedItem);

      // Vérifier si destination.index est valide pour insérer l'élément supprimé
      if (destination.index >= 0 && destination.index <= newDataColumn.length) {
        // Utiliser la méthode splice() pour insérer l'élément supprimé à la nouvelle position
        newDataColumn.splice(destination.index, 0, removedItem[0]);

        console.log(
          "Nouveau tableau dataColumn après la suppression et le déplacement :",
          newDataColumn
        );
      } else {
        console.log(
          "La nouvelle position de destination.index n'est pas valide."
        );
      }
    } else {
      console.log("Élément non trouvé dans le tableau dataColumn.");
    }

    // setData(newStateArray);
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
          <TableContainer component={Paper}>
            <Table>
              <TableHead style={{ backgroundColor: "#05153f" }}>
                <TableRow>
                </TableRow>
              </TableHead>
              <TableBody>
                <DragDropContext onDragEnd={onDragEnd}>
                  <TableRow
                  // style={{ border: "2px solid red", borderRadius: "2px" }}
                  >
                    <TableBody>
                      {!isEmpty(tasks) &&
                        Object.keys(tasks).map((e) => (
                          <>
                          <p>{e}</p>
                          <Droppable droppableId={e}>
                            {(Provider) => (
                              <div
                                {...Provider.droppableProps}
                                ref={Provider.innerRef}
                              >
                                {tasks[e].map((task) => (
                                  <TacheKanban
                                    key={task._id}
                                    titre={task.titre}
                                    auteur={task.auteur}
                                    details={task.details}
                                    duree={task.duree}
                                    statut={task.statut}
                                    taskId={task._id}
                                    // supp={deletetTaches}
                                  />
                                ))}
                              </div>
                            )}
                          </Droppable>
                          </>
                        ))}
                    </TableBody>
                    {/* <TableCell
                      style={{ border: "2px solid lightgrey", width: "20%" }}
                    >
                      <Droppable droppableId="A traiter">
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {data
                              .filter((tache) => tache.statut === "A traiter")
                              .map((tache, index) => (
                                <TacheKanban
                                  key={tache._id}
                                  titre={tache.titre}
                                  auteur={tache.auteur}
                                  details={tache.details}
                                  duree={tache.duree}
                                  statut={tache.statut}
                                  taskId={tache._id}
                                  index={index}
                                  // deplacerTache={deplacerTache}
                                />
                              ))}
                          </div>
                        )}
                      </Droppable>
                    </TableCell> */}
                  </TableRow>
                </DragDropContext>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}
