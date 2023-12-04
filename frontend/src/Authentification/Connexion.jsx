import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { baseURL } from "../Services/utils";

export default function Connexion() {
  const [unique, setUnique] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const paperStyle = { padding: "30px 20px", width: 350, margin: "20px auto" };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const data = {
      password: password,
      unique: isNaN(unique) ? unique : parseFloat(unique),
    };
    axios
      .post(`${baseURL}/users/connexion`, data)
      .then((res) => {
        if (res.data.message === "success") {
          const token = res.data.data.token;
          const login = res.data.data.Utilisateur;
          localStorage.setItem("login", JSON.stringify(login));
          Cookies.set("token", token);
          console.log(token);
          setMessage(true);
          setTimeout(() => {
            navigate("/index");
            window.location.reload();
          }, 1000);
        } else {
          setError(true);
          setTimeout(() => {
            navigate("/inscrire");
          }, 1000);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>{/* <AddCircleIcon /> */}</Avatar>

          <h2 style={headerStyle}>Connexion</h2>
          <Typography variant="caption" gutterBottom>
            Renseignez les informations pour vous connecter
          </Typography>
        </Grid>
        {message && (
          <span
            style={{
              backgroundColor: "#1bbd7e",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            {" "}
            vous êtes connecté{" "}
          </span>
        )}
        {error && (
          <span
            style={{ color: "red", fontSize: "20px", alignItems: "center" }}
          >
            {" "}
            Informations incorrectes{" "}
          </span>
        )}
        <form action="">
          <TextField
            required
            value={unique}
            onChange={(e) => setUnique(e.target.value)}
            fullWidth
            label=" Telephone ou Email : "
            variant="outlined"
            placeholder="Votre adresse mail"
            style={{ marginTop: "20px" }}
          />
          <TextField
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            label="Mot de passe : "
            variant="outlined"
            placeholder="votre mot de passe"
            style={{ marginTop: "35px" }}
          />
          <Grid
            align="center"
            style={{
              marginTop: "60px",
              fontSize: "18px",
              cursor: "pointer",
              color: "#1bbd7e",
              fontWeight: "bold",
            }}
          >
            <span>Mot de passe oublié ?</span>
          </Grid>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: "40px", margin: "20px" }}
          >
            Se connecter
          </Button>
          <Link to="inscrire">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "40px", margin: "20px" }}
            >
              S'inscrire
            </Button>
          </Link>
        </form>
      </Paper>
    </Grid>
  );
}


