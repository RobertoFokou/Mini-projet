import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "../styles/Ajouter.css";
import { useDispatch } from "react-redux";
import {
  editTachesProjet,
  getAllTachesProjet,
} from "../../actions/ListeTaches.action";
import { Select, MenuItem } from "@mui/material";
import { isEmpty } from "../../Services/utils";

export default function ModiferTacheProjet() {
  const data = JSON.parse(localStorage.getItem("membre"));
  const params = useParams();
  const id = params.id;
  const dataSelect = JSON.parse(localStorage.getItem("tacheProjetSelect"));
  const keys = Object.keys(dataSelect);
  let dataFilter = [];

  keys.forEach((key) => {
    dataFilter = dataFilter.concat(
      dataSelect[key].filter((el) => el._id === id)
    );
  });
  const dataId = dataFilter[0];
  console.log(dataId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [auteur, setAuteur] = useState(dataId?.auteur ?? "");
  const [titre, setTitre] = useState(dataId?.titre ?? "");
  const [duree, setDuree] = useState(dataId?.duree ?? "");
  const [details, setDeatails] = useState(dataId?.details ?? "");
  const [statut, setStatut] = useState(dataId?.statut ?? "");
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  const [member, setMember] = useState("Ajouter un membre");

  function handleChoix(e) {
    setStatut(e.target?.value);
  }

  function handleMember(e) {
    setMember(e.target.value);
  }

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
        statut: statut,
        duree: duree,
        member: member,
        id: id,
      };
      await dispatch(editTachesProjet(updateTaches));
      dispatch(getAllTachesProjet());
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
        <Select value={statut} onChange={handleChoix} style={{ width: "100%" }}>
          <MenuItem value={"Backlog"}>Backlog</MenuItem>
          <MenuItem value={"A Traiter"}>A Traiter</MenuItem>
          <MenuItem value={"En Cours"}>En Cours</MenuItem>
          <MenuItem value={"En Test"}>En Test</MenuItem>
          <MenuItem value={"Terminer"}>Terminer</MenuItem>{" "}
        </Select>
        <Select
          value={member}
          onChange={handleMember}
          style={{ width: "100%" }}
        >
          {!isEmpty(data) ? (
            data.map((data) => (
              <MenuItem value={data.nom + " " + data.prenom}>
                {data.nom}-{data.prenom}
              </MenuItem>
            ))
          ) : (
            <option value="">Aucun nom disponible</option>
          )}
        </Select>
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
