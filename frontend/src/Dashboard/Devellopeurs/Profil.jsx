import React from "react";
import "../styles/Profil.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Profil() {
  const user = JSON.parse(localStorage.getItem("login"));
  return (
    <div>
      <div className="image">
        <img src={`http://localhost:5000/${user?.photo}`} alt=""></img>
      </div>

      <div className="info_profil">
        <div className="texte_info">
          <p>Nom d'utilisateur : </p>
          <h3>{user?.nom}</h3>
        </div>

        <div className="texte_info">
          <p>prenom d'utilisateur : </p>
          <h3>{user?.prenom}</h3>
        </div>

        <div className="texte_info">
          <p>Numero de telephone : </p>
          <h3>{user?.telephone}</h3>
        </div>

        <div className="texte_info">
          <p>Email d'utilisateur : </p>
          <h3>{user?.email}</h3>
        </div>

        <div className="texte_info">
          <p>Civilité d'utilisateur : </p>
          <h3>{user?.genre}</h3>
        </div>

        <div className="texte_info">
          <p>privilege d'utilisateur : </p>
          <h3>{user?.privilege}</h3>
        </div>

        <Link to="/dashbord/update_Profil">
          <Button
            className="btn"
            variant="contained"
            type="submit"
            style={{
              cursor: "pointer",
            }}
          >
            MODIFIER
          </Button>
        </Link>
      </div>
    </div>
  );
}
