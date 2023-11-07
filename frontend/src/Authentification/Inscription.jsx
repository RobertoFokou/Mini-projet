import {
  Avatar,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import React from "react";

export default function Inscription() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState("");
  const [genre, setGenre] = useState("");
  const [password, setPassword] = useState("");
  const [passconfirm, setPassconfirm] = useState("");

  const [nomMessage, setNomMessage] = useState(false);
  const [prenomMessage, setPrenomMessage] = useState(false);
  const [telMessage, setTelsMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [passMessage, setPassMessage] = useState(false);
  const [strongMessage, setStrongMessage] = useState(false);
  const [finalMessage, setFinaMessage] = useState(false);
  const [numExist, setNumExist] = useState(false);
  const [EmailExist, setEmailExist] = useState(false);

  const paperStyle = { padding: "30px 20px", width: 350, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleIcon />
          </Avatar>

          <h2 style={headerStyle}>Inscription</h2>
          <Typography variant="caption" gutterBottom>
            Utiliser ce formulaire pour créer votre compte
          </Typography>
        </Grid>
        <form action="">
          <TextField
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            fullWidth
            label="Nom : "
            variant="standard"
            placeholder="Entrer votre nom ici"
          />
          <TextField
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            fullWidth
            label="Prenom : "
            variant="standard"
            placeholder="Entrer votre prenom"
          />
          <TextField
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            fullWidth
            label="Telephone : "
            variant="standard"
            type="number"
            placeholder="Votre numero de telephone"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email : "
            variant="standard"
            placeholder="Votre adresse mail"
          />
          <TextField
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            fullWidth
            label="photo : "
            variant="standard"
            placeholder="photo de profil"
            type="file"
          />
          <FormControl style={{ marginTop: 5 }}>
            <FormLabel id="demo-radio-buttons-group-label">Genre : </FormLabel>
            <RadioGroup
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ display: "initial" }}
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="Femme"
                control={<Radio />}
                label="Femme"
              />
              <FormControlLabel
                value="Homme"
                control={<Radio />}
                label="Homme"
              />
            </RadioGroup>
          </FormControl>
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Mot de passe : "
            variant="standard"
            placeholder="votre mot de passe"
          />
          <TextField
            value={passconfirm}
            onChange={(e) => setPassconfirm(e.target.value)}
            fullWidth
            label="Confirmer mot de passe :"
            variant="standard"
            placeholder="Retapez le mot de passe"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
          >
            Envoyer
          </Button>
        </form>
      </Paper>
    </Grid>
  );
}
