import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { baseURL, isEmpty } from "../../Services/utils";
import { useSelector } from "react-redux";
import "../styles/TachesAPI.css";
import MembreBd from "./Membres";
import axios from "axios";
import { TextField } from "@mui/material";

export default function AfficherMembre() {
  const [confirmSeach, setConfirmSeach] = useState(false);
  const [email, setEmail] = useState("");
  const [champVide, setChampVide] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(false);
  const [message2, setMessage2] = useState(false);
  const user = useSelector((state) => state.tacheUserAPI);
  localStorage.setItem("dataSelectAPI", JSON.stringify(user));
  const dataIdSelect = JSON.parse(localStorage.getItem("projetSelect"));
  console.log(dataIdSelect);
  const idMember = dataIdSelect.members
  console.log(idMember);
  useEffect(() => {
    axios.get(`${baseURL}/users/getUserProjet/${idMember}`).then((res) => {
      // Mettre à jour la constante "tasks" avec les nouvelles données
      const data = res.data;
      console.log(data);
    });
  }, [idMember]);
  const params = useParams();
  const id = params.id;
  console.log(id);
  const handleSeachClick = () => {
    setConfirmSeach(true);
  };

  const handleCancelSeach = (e) => {
    e.stopPropagation();
    setConfirmSeach(false);
  };

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  //Fonction de recherche d'un utilisateur dans la BD via l'addresse mail
  function handleSubmit(e) {
    e.preventDefault();
    if (email.length > 1 && isValidEmail(email)) {
      setChampVide(false);
      const data = {
        email: email,
      };
      axios.post(`${baseURL}/users/getOne/${id}`, data).then((res) => {
        console.log(res.data);
        console.log(res.data.Utilisateur);
        if (res.data.message === "success") {
          setMessage(true);
          setError(false);
        } else if (
          res.data.message === "L'utilisateur est déjà membre du projet"
        ) {
          setMessage2(true);
          setMessage(false);
          setError(false);
        } else {
          setError(true);
          setMessage(false);
          setMessage2(false)
        }
      });
    } else {
      setChampVide(true);
      setMessage(false);
      setMessage2(false)
    }
  }

  return (
    <div className="App">
      <h1>
        Nombre total de membres :{" "}
        <span style={{ color: "red" }}> {user.length}</span>
      </h1>
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <Link to="/dashbord/projet">
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
            Retour
          </button>
        </Link>
        <Link to="/dashbord/projet">
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
            Ajouter une donnée
          </button>
        </Link>
        <br />
        <br />
        <div
          style={{
            marginLeft: "55%",
            display: "flex",
            gap: "5px",
            backgroundColor: "blue",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "white",
            fontSize: "14px",
            borderRadius: "4px",
          }}
          onClick={handleSeachClick}
        >
          <i class="fa-solid fa-user"></i>
          <span>Ajouter un membre au projet</span>
          {confirmSeach ? (
            <div className="dialog-overlay">
              <div className="dialog-content">
                <div className="dialog-buttons">
                  {champVide && (
                    <span style={{ color: "red" }}>
                      Veillez renseigner une addresse mail correcte
                    </span>
                  )}
                  {error && (
                    <span style={{ color: "red" }}>
                      Aucun utilisateur trouvé
                    </span>
                  )}
                  {message && (
                    <span style={{ color: "#1bbd7e" }}>utilisateur trouvé</span>
                  )}
                  {message2 && (
                    <span style={{ color: "#1bbd7e" }}>L'utilisateur est déjà membre du projet</span>
                  )}
                  <TextField
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    label="Entrez l'addresse mail de la personne : "
                    variant="outlined"
                    placeholder="Votre adresse mail"
                    style={{ marginTop: "20px" }}
                  />
                  <button
                    onClick={handleCancelSeach}
                    style={{
                      cursor: "pointer",
                      margin: "20px",
                      padding: "8px",
                    }}
                  >
                    Quitter
                  </button>
                  <button
                    onClick={handleSubmit}
                    style={{ cursor: "pointer", padding: "8px" }}
                  >
                    Confirmer
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <h2></h2>
          )}
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "red" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Nom</TableCell>
                <TableCell style={{ color: "white" }}>Prenom</TableCell>
                <TableCell style={{ color: "white" }}>Numéro </TableCell>
                <TableCell style={{ color: "white" }}>email</TableCell>
                <TableCell style={{ color: "white" }}>Privilège</TableCell>
                <TableCell style={{ color: "white" }}>photo</TableCell>
                <TableCell style={{ color: "white" }}>Retirer</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!isEmpty(user) &&
                user.map((e) => (
                  <MembreBd
                    key={e.id}
                    nom={e.nom}
                    prenom={e.prenom}
                    numero={e.telephone}
                    email={e.email}
                    privilege={e.privilege}
                    photo={e?.photo}
                    taskId={e._id}
                    // supp={deletetTaches}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
