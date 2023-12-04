import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import { editProjets, getProjets } from "../../actions/projets.actions";

export default function ModiferProjet() {
  const params = useParams();
  const id = params.id;
  const dataSelect = JSON.parse(localStorage.getItem("projet"));
  console.log(dataSelect);
  const dataId = dataSelect.filter((el) => el._id === id)[0];

  // console.log(dataId)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [description, setDescription] = useState(dataId?.nom);
  const [dateCreation, setDateCreation] = useState(dataId?.dateCreation);
  const [dateLivraison, setDateLivraison] = useState(dataId?.dateLivraison);
  const [details, setDeatails] = useState(dataId?.details);
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    if (
      description === "" ||
      dateCreation === "" ||
      dateLivraison === "" ||
      details === ""
    ) {
      setBad(true);
      setGood(false);
    } else {
      setBad(false);
      setGood(true);
      const updateTaches = {
        nom: description,
        dateCreation: dateCreation,
        dateLivraison: dateLivraison,
        details: details,
        id: id,
      };
      await dispatch(editProjets(updateTaches));
      dispatch(getProjets());
      setTimeout(() => {
        navigate("/dashbord/projet");
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
          type="date"
          value={dateCreation}
          onChange={(e) => setDateCreation(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          variant="outlined"
          type="date"
          value={dateLivraison}
          onChange={(e) => setDateLivraison(e.target.value)}
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
