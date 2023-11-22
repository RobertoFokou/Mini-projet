import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import "../styles/inscription.css";
import axios from "axios";
import { baseURL } from "../../Services/utils";
import { Link, useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

export default function Modifier_Profil() {
  const user = JSON.parse(localStorage.getItem("login"));
  const id = user._id
  const [nom, setNom] = useState(user?.nom);
  const [prenom, setPrenom] = useState(user?.prenom);
  const [telephone, setTelephone] = useState(user?.telephone);
  const [photo, setPhoto] = useState(null);
  const [email, setEmail] = useState(user?.email);

  const [nomMessage, setNomMessage] = useState(false);
  const [prenomMessage, setPrenomMessage] = useState(false);
  const [telMessage, setTelsMessage] = useState(false);
  const [emailMessage, setEmailMessage] = useState(false);
  const [finalMessage, setFinaMessage] = useState(false);
  const [numExist, setNumExist] = useState(false);
  const navigate = useNavigate();

  const handePhotoChange = (e) => {
    // console.log(e.target.files[0]);
    setPhoto(e.target.files[0]);
  };

  const handleNomChange = () => {
    if (nom.length < 3) {
      setNomMessage(true);
    } else {
      setNomMessage(false);
    }
  };

  const handlePrenomChange = () => {
    if (prenom.length < 3) {
      setPrenomMessage(true);
    } else {
      setPrenomMessage(false);
    }
  };

  const handleTelephoneChange = () => {
    if (telephone.length !== 9) {
      setTelsMessage(true);
    } else {
      setTelsMessage(false);
    }
  };

  const handleEmailChange = (e) => {
    if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
      setEmailMessage(false);
    } else {
      setEmailMessage(true);
    }
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (nom.length > 1 && telephone.length === 9) {
      const formdata = new FormData();
      formdata.append("nom", nom);
      formdata.append("prenom", prenom);
      formdata.append("telephone", telephone);
      formdata.append("email", email);
      formdata.append("photo", photo);
      formdata.append("id", id)
      axios
        .put(`${baseURL}/users/${id}`, formdata, {
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
    }
  }

  const paperStyle = {
    padding: "30px 20px",
    width: 600,
    margin: "20px auto",
  };
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  return (
    <Grid>
      <Paper elevation={20} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <AddCircleIcon />
          </Avatar>

          <h2 style={headerStyle}>Mise à jour</h2>
          <Typography variant="caption" gutterBottom>
            Saisissez vos informations pour mettre à jour votre compte
          </Typography>
        </Grid>
        {numExist && (
          <p style={{ color: "red" }}>le nnumero de telephone existe deja</p>
        )}
        {finalMessage && (
          <span
            style={{ color: "#1bbd7e", textAlign: "center", fontSize: "20px" }}
          >
            Mise à jour Effectueée avec success
          </span>
        )}
        <form action="">
          <div
            style={{
              border: "2px solid rgba(0, 0, 0, 0.25)",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              padding: "30px",
              marginTop: "20px",
              borderRadius: "20px",
              // margin: "20px auto"
            }}
          >
            <div>
              <div>
                {" "}
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": {
                      m: 1,
                      width: "40%",
                      alignItems: "center",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {/* PREMIER ELEMENT NOM ET PRENOM :  */}
                  <div style={{ display: "flex", gap: 20, width: "100%" }}>
                    <div>
                      <TextField
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        onBlur={handleNomChange}
                        fullWidth
                        label="Nom : "
                        variant="outlined"
                        placeholder="Entrer votre nom ici"
                        style={{ width: "100%", marginBottom: "10px" }}
                        // sx={{ width: '100%', mb: 1 }}
                      />
                      <div>
                        {nomMessage && (
                          <p style={{ color: "red" }}>
                            Veuillez renseigner votre nom
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <TextField
                        value={prenom}
                        onChange={(e) => setPrenom(e.target.value)}
                        onBlur={handlePrenomChange}
                        fullWidth
                        label="Prenom : "
                        variant="outlined"
                        placeholder="Entrer votre prenom"
                        style={{ marginBottom: "10px" }}
                        // sx={{ width: '100%', mb: 1 }}
                      />
                      <div>
                        {prenomMessage && (
                          <p style={{ color: "red" }}>
                            Veuillez renseigner votre prenom
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* DEUXIEME ELEMENT TELEPHONE ET EMAIL :  */}
                  <div style={{ display: "flex", gap: 20, width: "100%" }}>
                    <div>
                      <TextField
                        required
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        onBlur={handleTelephoneChange}
                        fullWidth
                        label="Telephone : "
                        variant="outlined"
                        type="number"
                        placeholder="Votre numero de telephone"
                        style={{ marginBottom: "10px" }}
                      />
                      <div>
                        {telMessage && (
                          <p style={{ color: "red" }}>
                            numéro de telephone incorrect
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <TextField
                        required
                        value={email}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailChange}
                        fullWidth
                        label="Email : "
                        variant="outlined"
                        placeholder="Votre adresse mail"
                        style={{ marginBottom: "10px" }}
                      />
                      <div>
                        {emailMessage && (
                          <p style={{ color: "red" }}>Email incorrect</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* TROISIEME ELEMENT MOT DE PASSE ET CONFIRMATION DE MOT DE PASSE :  */}
            
                  <TextField
                    // value={photo}
                    onChange={handePhotoChange}
                    fullWidth
                    // label="photo : "
                    variant="outlined"
                    placeholder="photo de profil"
                    type="file"
                    enctype="multipart/form-data"
                    style={{ marginBottom: "10px" }}
                  />
                </Box>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "40px",
                margin: "20px",
                borderRadius: "20px",
              }}
            >
              S'inscrire
            </Button>
            <Link to="/dashbord/profil">
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
                Annuler
              </Button>
            </Link>
          </div>
        </form>
      </Paper>
    </Grid>
  );
}
