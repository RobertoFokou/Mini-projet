import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import React from "react";

export default function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <IconButton>
          <p style={{ color: "white" }}>Bonjour boss</p>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          POKEMON
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button style={{ color: "inherit" }}> Accueil</Button>
          <Button style={{ color: "inherit" }}> Profil</Button>
          <Button style={{ color: "inherit" }}> Ajouter</Button>
          <Button style={{ color: "inherit" }}> Deconnexion</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
