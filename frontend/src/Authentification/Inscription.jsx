import React from "react";
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
import "../styles/inscription.css";
import axios from "axios";
import { baseURL } from "../Services/utils";
import { Link, useNavigate } from "react-router-dom";

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
  // const [emailMessage, setEmailMessage] = useState(false);
  const [passMessage, setPassMessage] = useState(false);
  const [strongMessage, setStrongMessage] = useState(false);
  const [finalMessage, setFinaMessage] = useState(false);
  const [numExist, setNumExist] = useState(false);
  const [genreMessage, setGenreMessage] = useState(false);
const navigate = useNavigate()

const handePhotoChange = (e) => {
  // console.log(e.target.files[0]);
  setPhoto(e.target.files[0]);
};

  const handelPasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length === "") {
      setStrongMessage("veille saisir le mot de passe");
    } else if (e.target.value.length < 5) {
      setStrongMessage("mot de passe faible");
    } else if (e.target.value.length < 8) {
      setStrongMessage("mot de passe moyen");
    } else {
      setStrongMessage("Mot de passe fort");
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (
      nom.length > 5 &&
      telephone.length === 9 &&
      password.length > 5 &&
      password === passconfirm
    ) {
      const formdata = new FormData();
      formdata.append("nom", nom);
      formdata.append("prenom", prenom);
      formdata.append("telephone", telephone);
      formdata.append("email", email);
      formdata.append("photo", photo);
      formdata.append("genre", genre);
      formdata.append("password", password);
      axios
        .post(`${baseURL}/users/add`, formdata, {
          headers: {
            "content-type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.status === "success") {
            setFinaMessage(true);
            setTimeout(() => {
              navigate("/");
            }, 2000);
          } else {
            // navigate("/inscription");
            console.log("erreur lors d'inscription ");
            setNumExist(true);
            setFinaMessage(false);
          }
        });
      setFinaMessage(true);
      setNumExist(false);
    } else {
      setFinaMessage(false);
      if (nom.length <= 5) {
        setNomMessage(true);
      } else {
        setNomMessage(false);
      }
      if (prenom.length <= 5) {
        setPrenomMessage(true);
      } else {
        setPrenomMessage(false);
      }
      if (genre.length === "") {
        setGenreMessage(true);
      } else {
        setGenreMessage(false);
      }
      if (telephone.length !== 9) {
        setTelsMessage(true);
      } else {
        setTelsMessage(false);
      }

      if (password !== passconfirm) {
        setPassMessage(true);
      } else {
        setPassMessage(false);
      }
    }
  }

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
        {numExist && (
          <span style={{ color: "red" }}>
            le nnumero de telephone existe deja
          </span>
        )}
        {finalMessage && (
          <span style={{ color: "#1bbd7e" }}>
            Inscription Effectueée avec success
          </span>
        )}
        <form action="">
          <FormControl style={{ marginTop: 5 }}>
            <FormLabel id="demo-radio-buttons-group-label">Genre : </FormLabel>
            <RadioGroup
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              style={{ display: "initial", marginBottom: "20px" }}
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
          {genreMessage && <span style={{ color: "red" }}>Veuille choisir votre genre</span>}
          <TextField
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            fullWidth
            label="Nom : "
            variant="outlined"
            placeholder="Entrer votre nom ici"
            style={{ marginBottom: "20px" }}
          />
          {nomMessage && (
            <span style={{ color: "red" }}>
              le nombre de caractere doit être supérieur à 5
            </span>
          )}
          <TextField
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            fullWidth
            label="Prenom : "
            variant="outlined"
            placeholder="Entrer votre prenom"
            style={{ marginBottom: "20px" }}
          />
          {prenomMessage && (
            <span style={{ color: "red" }}>
              le nombre de caractere doit être supérieur à 5
            </span>
          )}
          <TextField
            value={telephone}
            onChange={(e) => setTelephone(e.target.value)}
            fullWidth
            label="Telephone : "
            variant="outlined"
            type="number"
            placeholder="Votre numero de telephone"
            style={{ marginBottom: "20px" }}
          />
          {telMessage && (
            <span style={{ color: "red" }}>
              le nnumero de telephone est incorrect
            </span>
          )}
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            label="Email : "
            variant="outlined"
            placeholder="Votre adresse mail"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            // value={photo}
            onChange={handePhotoChange}
            fullWidth
            label="photo : "
            variant="outlined"
            placeholder="photo de profil"
            type="file"
            enctype="multipart/form-data"
            style={{ marginBottom: "20px" }}
          />
          <TextField
            required
            value={password}
            onChange={handelPasswordChange}
            fullWidth
            label="Mot de passe : "
            variant="outlined"
            placeholder="votre mot de passe"
            style={{ marginBottom: "20px" }}
          />
          {prenomMessage && (
            <span style={{ color: "red" }}>
              le nombre de caractere doit être supérieur à 5
            </span>
          )}
          {strongMessage && (
            <span style={{ color: "#1bbd7e" }}>{strongMessage}</span>
          )}
          <TextField
            value={passconfirm}
            onChange={(e) => setPassconfirm(e.target.value)}
            fullWidth
            label="Confirmer mot de passe :"
            variant="outlined"
            placeholder="Retapez le mot de passe"
            style={{ marginBottom: "20px" }}
          />
          {passMessage && (
            <span style={{ color: "red" }}>
              les mots de passes sont differents
            </span>
          )}
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "40px", margin: "20px", borderRadius: "20px" }}
          >
            S'inscrire
          </Button>
          <Link to="/">
            <Button
              // onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "40px",
                margin: "20px",
                borderRadius: "20px",
              }}
            >
              Se connecter
            </Button>
          </Link>
        </form>
      </Paper>
    </Grid>
  );
}
