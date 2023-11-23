import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
// import { v4 as uuidv4 } from "uuid";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import { baseURL } from "../../Services/utils";
import { addProjets, getProjets } from "../../actions/projets.actions";

export default function AjouterProjet() {
  const user = JSON.parse(localStorage.getItem("login"));
  const nom = user.nom;
  // console.log(nom);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState("");
  const [dateCreation, setDateCreation] = useState("");
  const [dateLivraison, setDateLivraison] = useState();
  const [details, setDeatails] = useState("");
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  // const [edit, setEdit] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (description === "" || dateCreation === "" || dateLivraison === "" || details === "") {
      setBad(true);
      setGood(false);
    } else {
      setBad(false);
      setGood(true);
      const newTaches = {
        description: description,
        dateCreation: dateCreation,
        dateLivraison: dateLivraison,
        details: details,
        developpeur: user._id,
      };

      await axios
        .post(`${baseURL}/projets/add`, newTaches)
        .then((res) => {
          console.log("nouvelle tache ajoutée avec succès");
          dispatch(addProjets(res.data));
          dispatch(getProjets())
        })
        .catch((error) => {
          console.log({
            error: error,
            msg: "erreur lors de la sauvagarde de la nouvelle tache",
          });
        });
      setTimeout(() => {
        navigate("/dashbord/all_taches");
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Auteur : "
          variant="outlined"
          type="date"
          value={dateCreation}
          onChange={(e) => setDateCreation(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Details : "
          variant="outlined"
          type="date"
          value={dateLivraison}
          onChange={(e) => setDateLivraison(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Description : "
          variant="outlined"
          type="text"
          value={details}
          onChange={(e) =>setDeatails(e.target.value)}
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
