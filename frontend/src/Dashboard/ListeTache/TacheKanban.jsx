import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const TacheKanban = ({
    titre,
    auteur,
    details,
    duree,
    origine,
}) => {
  return (
    <Card>
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
          Statut : {origine}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TacheKanban;
