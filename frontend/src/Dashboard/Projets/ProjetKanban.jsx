import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const ProjetKanban = ({
  description,
  dateCreation,
  dateLivraison,
  details,
  origine,
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date de création : {dateCreation}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Date de livraison : {dateLivraison}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Détails : {details}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origine : {origine}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjetKanban;
