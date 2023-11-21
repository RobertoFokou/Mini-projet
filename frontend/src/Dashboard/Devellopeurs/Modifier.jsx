import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import { editTachesAPI, getTachesAPI} from "../../actions/API_taches";

export default function ModiferTache() {
  const params = useParams();
  const id = params.id;
  const dataSelect = JSON.parse(localStorage.getItem("dataSelectAPI"));
  console.log(dataSelect);
  const dataId = dataSelect.filter((el) => el._id === id)[0];

  // console.log(dataId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auteur, setAuteur] = useState(dataId?.auteur);
  const [titre, setTitre] = useState(dataId?.titre);
  const [duree, setDuree] = useState(dataId?.duree);
  const [details, setDeatails] = useState(dataId?.details);
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (titre === "" || auteur === "" || duree === "" || details === "") {
      setBad(true);
      setGood(false);
    } else {
      setBad(false);
      setGood(true);
      const updateTaches = {
        titre: titre,
        auteur: auteur,
        details: details,
        duree: duree,
        id: id,
      };
      await dispatch(editTachesAPI(updateTaches));
      dispatch(getTachesAPI());
      setTimeout(() => {
        navigate("/dashbord/all_taches");
      }, 1000);
    }
  };

  return (
    <div className="add">
      <form action="">
        {good && <span className="good">Tâche mise à jour avec succès</span>}
        {bad && <span className="bad">Veillez renseigner tous les champs</span>}
        <br />
        <TextField
          className="input-field"
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={auteur}
          onChange={(e) => setAuteur(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          variant="outlined"
          type="text"
          value={details}
          onChange={(e) => setDeatails(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
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
          Valider les modifications
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
