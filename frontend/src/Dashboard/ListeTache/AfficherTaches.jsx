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
  const [data, setData] = useState([]);

  useEffect(() => {
    localStorage.setItem("ListeTachesProjet", JSON.stringify(tasks));
    const id2 = params.id;
    const tacheProjetSelect = tasks.filter((el) => el.projet?._id === id2);
    localStorage.setItem(
      "tacheProjetSelect",
      JSON.stringify(tacheProjetSelect)
    );
    const storedData = localStorage.getItem("tacheProjetSelect");

    console.log("executed", tacheProjetSelect);
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setData(parsedData);
    }
  }, [tasks, params.id]);

  console.log(data);

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

    // Pour connaitre la colonne dans laquelle on se trouve
    const dataColumn = data.filter(
      (tache) => tache.statut === source.droppableId
    );
    console.log("colonne ou on a bougée une tache", dataColumn);

    // pour avoir la tâche bougé dans la colonne oû on se trouve
    const column = dataColumn.find((el) => el._id === draggableId);
    console.log("tâche bougée", column);

    // Trouver l'index de l'élément "column" dans le tableau "dataColumn"
    const columnIndex = dataColumn.findIndex((el) => el._id === draggableId);

    // Vérifier si l'élément a été trouvé avant de le supprimer
    if (columnIndex !== -1) {
      // Utiliser la méthode splice() pour supprimer l'élément à l'index columnIndex
      const newDataColumn = [...dataColumn]; // Créer une copie du tableau dataColumn
      const removedItem = newDataColumn.splice(columnIndex, 1); // Supprimer 1 élément à l'index columnIndex
      console.log("Nouveau tableau dataColumn après la suppression:", newDataColumn);
      console.log(" dataColumn après la removedItem :",removedItem);

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

    // utilisons filter() pour créer un nouveau tableau updatedDataColumn qui exclut l'élément column
    // const updatedDataColumn = dataColumn.filter((el) => el._id !== draggableId);
    // console.log("colonne après suppression", updatedDataColumn);

    // const newPosition = source.destination;
    // updatedDataColumn.splice(newPosition, 1, column);
    // console.log("colonne après suppression et ajout", updatedDataColumn);

    //  Ajouter cet element à la nouvelle position
    //  const removedElement = dataColumn.splice(source.index , 1);
    //  console.log("removedElement",removedElement);

    // On récupère les ids de tous les élément de dataColumn
    // const newTaskIds = dataColumn.map((task) => task._id);
    // console.log(newTaskIds);

    // const newTacheId = Array.from(
    //   newTaskIds.filter((id) => id !== draggableId)
    // );
    // console.log(newTacheId);
    // suppression de l'element du tableu
    // const deletetTaches = dataColumn.splice(source.index, 1)[0];
    // console.log(deletetTaches);
    // console.log(dataColumn);
    // Ajout de l'element dans la nouvelle position
    // dataColumn.splice(destination.index, 0, column);
    // console.log(column);

    // const newColums = {
    //   ...column,
    //   newTaskIds: newTacheId,
    // };

    // const newState = {
    //   ...data,
    //   [newColums._id]: newColums,
    // };
    // const newColumsArray = Object.values(newColums);
    // const newStateArray = Object.values(newState);
    // console.log(data);
    // console.log(newColumsArray);
    // console.log(newStateArray);

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
        <span style={{ color: "red" }}> {data.length}</span> Taches
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
                {!isEmpty(data) &&
                  data.map((e) => (
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
        <div>
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
                <DragDropContext onDragEnd={onDragEnd}>
                  <TableRow
                    style={{ border: "2px solid red", borderRadius: "2px" }}
                  >
                    <TableCell
                      style={{ border: "2px solid lightgrey", width: "20%" }}
                    >
                      <Droppable droppableId="Backlog">
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {data
                              .filter((tache) => tache.statut === "Backlog")
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
                    </TableCell>
                    <TableCell
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
                    </TableCell>
                    <TableCell
                      style={{ border: "2px solid lightgrey", width: "20%" }}
                    >
                      <Droppable droppableId="En cours">
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {data
                              .filter((tache) => tache.statut === "En cours")
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
                    </TableCell>
                    <TableCell
                      style={{ border: "2px solid lightgrey", width: "20%" }}
                    >
                      <Droppable droppableId="En test">
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {data
                              .filter((tache) => tache.statut === "En Test")
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
                    </TableCell>
                    <TableCell
                      style={{ border: "2px solid lightgrey", width: "20%" }}
                    >
                      <Droppable droppableId="Terminer">
                        {(Provider) => (
                          <div
                            {...Provider.droppableProps}
                            ref={Provider.innerRef}
                          >
                            {data
                              .filter((tache) => tache.statut === "Terminer")
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
                    </TableCell>
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
