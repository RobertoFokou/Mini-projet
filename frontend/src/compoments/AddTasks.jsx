import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import TaskContext from "./TaskContext";
import "../styles/AddTasks.css";

export default function AddTasks() {
  const navigate = useNavigate()
  const { add } = useContext(TaskContext);
  const [nom, setNom] = useState("");
  const [title, setTitle] = useState("");
  const [good, setGood] = useState(false);
  const [bad, setBad] = useState(false);
  function handleClick(e) {
    e.preventDefault();
    if (title === "" || nom === "") {
      setBad(true);
      setGood(false);
    } else {
      add(title, nom);
      setBad(false);
      setGood(true);
      setTimeout(() => {
        navigate("/index");
      }, 1000);
    }
  }

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
          label="Nom : "
          variant="outlined"
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <TextField
          className="input-field"
          id="outlined-basic"
          label="Tache : "
          variant="outlined"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
        <Link to="/">
          <button
            type="submit"
            style={{
              border: "none",
              cursor: "pointer",
              padding: "8px",
              color: "blue",
              fontSize: "14px",
              marginTop: "10px",
            }}
          >
            Afficher toutes les taches
          </button>
        </Link>
      </form>
      <br />
    </div>
  );
}
