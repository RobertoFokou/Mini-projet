import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Draggable } from "react-beautiful-dnd";

const TacheKanban = ({
  titre,
  auteur,
  details,
  duree,
  statut,
  taskId,
  index,
  deplacerTache,
}) => {
  return (
    <Draggable draggableId={taskId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card style={{ justifyContent: "space-between" }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {index + 1}. {titre}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Objectifs: {auteur}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Détails: {details}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Durée: {duree}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Statut: {statut}
              </Typography>
            </CardContent>
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default TacheKanban;
