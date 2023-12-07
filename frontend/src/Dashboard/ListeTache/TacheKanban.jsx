import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "./Types";

const TacheKanban = ({
  titre,
  auteur,
  details,
  duree,
  statut,
  taskId,
  deplacerTache,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.TACHE,
    item: { taskId, statut },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.TACHE,
    drop: (item) => {
      if (item.taskId !== taskId) {
        deplacerTache(item.taskId, statut);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div style={{ border: "2px solid red" }}></div>
      <div  ref={drop} style={{ backgroundColor: isOver ? "yellow" : "transparent" }}>
        <Card style={{ justifyContent: "space-between" }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {titre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Objectifs : {auteur}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Détails : {details}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Durée : {duree}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Statut : {statut}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TacheKanban;
