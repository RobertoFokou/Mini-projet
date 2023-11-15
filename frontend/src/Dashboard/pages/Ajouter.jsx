import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import { baseURL } from "../../Services/utils";
import { addTachesAPI, getOneTachesAPI } from "../../actions/API_taches";

export default function AjouterTaches() {
  const user = JSON.parse(localStorage.getItem("login"));
  const telephone = user.telephone;
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auteur, setAuteur] = useState("");
  const [titre, setTitre] = useState("");
  const [duree, setDuree] = useState();
  const [details, setDeatails] = useState("");
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  // const [edit, setEdit] = useState(false);
  const handleClick = async (e) => {
    e.preventDefault();
    if (titre === "" || auteur === "" || duree === "" || details === "") {
      setBad(true);
      setGood(false);
    } else {
      setBad(false);
      setGood(true);
      const newTaches = {
        titre: titre,
        auteur: auteur,
        details: details,
        duree: duree,
        telephone: telephone,
      };

      await axios
        .post(`${baseURL}/taches/add`, newTaches)
        .then((res) => {
          console.log("nouvelle tache ajoutée avec succès");
          console.log(res.data);
          console.log(newTaches);
          dispatch(addTachesAPI(newTaches))
        //   dispatch(getOneTachesAPI())
        })
        .catch((error) => {
          console.log({
            error: error,
            msg: "erreur lors de la sauvagarde de la nouvelle tache",
          });
        });
      setTimeout(() => {
        navigate("/dashbord/all_taches");
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
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Durée : "
          variant="outlined"
          type="number"
          value={duree}
          onChange={(e) => setDuree(e.target.value)}
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
        <Link to="/dashbord/all_taches">
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
