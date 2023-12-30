import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Select, MenuItem } from "@mui/material";
import axios from "axios";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import { baseURL, isEmpty } from "../../Services/utils";
import {
  addTachesProjet,
  getAllTachesProjet,
} from "../../actions/ListeTaches.action";

export default function AjouterTachesProjets() {
  const projet = JSON.parse(localStorage.getItem("projetSelect"));
  const user = JSON.parse(localStorage.getItem("login"));
  const data = JSON.parse(localStorage.getItem("membre"));
  console.log(data);
  // console.log(nom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auteur, setAuteur] = useState("");
  const [titre, setTitre] = useState("");
  const [duree, setDuree] = useState();
  const [details, setDeatails] = useState("");
  const [statut, setStatut] = useState("Backlog");
  const [member, setMember] = useState("Ajouter un membre");
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);

  function handleChoix(e) {
    setStatut(e.target.value);
  }

  function handleMember(e) {
    setMember(e.target.value);
  }

  const handleChangeDuree = (e) => {
    let value = e.target.value;
    if (value < 0) {
      value = 0;
    }
    setDuree(value);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      titre === "" ||
      auteur === "" ||
      duree === "" ||
      details === "" ||
      statut === ""
    ) {
      setBad(true);
      setGood(false);
    } else {
      setBad(false);
      setGood(true);
      const newTaches = {
        titre: titre,
        auteur: auteur,
        details: details,
        statut: statut,
        member: member,
        duree: duree,
        projet: projet._id,
        developpeur: user._id,
      };

      await axios
        .post(`${baseURL}/tachesProjet/add`, newTaches)
        .then((res) => {
          console.log("nouvelle tache ajoutée avec succès");
          dispatch(addTachesProjet(res.data));
          dispatch(getAllTachesProjet());
        })
        .catch((error) => {
          console.log({
            error: error,
            msg: "erreur lors de la sauvagarde de la nouvelle tache",
          });
        });
      setTimeout(() => {
        navigate("/dashbord/projet");
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <div className="add">
      <form action="">
        {good && (
          <span className="good">Nouvelle tache ajoutée avec succès</span>
        )}
        {bad && <span className="bad">Veillez renseigner tous les champs</span>}
        <br />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Titre : "
          variant="outlined"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Auteur : "
          variant="outlined"
          type="text"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Details : "
          variant="outlined"
          type="text"
          value={details}
          onChange={(e) => setDeatails(e.target.value)}
        />
        <br />
        <br />
        <Select value={statut} onChange={handleChoix} style={{ width: "100%" }}>
          <MenuItem value={"Backlog"}>Backlog</MenuItem>
          <MenuItem value={"A traiter"}>A traiter</MenuItem>
          <MenuItem value={"En cours"}>En cours</MenuItem>
          <MenuItem value={"En Test"}>En Test</MenuItem>
          <MenuItem value={"Terminer"}>Terminer</MenuItem>{" "}
        </Select>
        {/* champs pour choisir la personne à qui sera attribué la tâche */}

        <Select
          value={member}
          onChange={handleMember}
          style={{ width: "100%" }}
        >
          {!isEmpty(data) ? (
            data.map((data) => (
              <MenuItem value={data.nom +" "+ data.prenom}>{data.nom}-{data.prenom}</MenuItem>
            ))
          ) : (
            <option value="">Aucun nom disponible</option>
          )}
        </Select>

        <TextField
          className="input-field"
          id="outlined-basic"
          label="Durée : "
          variant="outlined"
          type="number"
          value={duree}
          onChange={handleChangeDuree}
        />
        <br />
        <Button
          className="btn"
          variant="contained"
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          Ajouter
        </Button>
        <br />
        <Link to="/dashbord/projet">
          <Button
            className="btn"
            variant="contained"
            type="submit"
            style={{
              cursor: "pointer",
            }}
          >
            Annuler
          </Button>
        </Link>
      </form>
      <br />
    </div>
  );
}
