import React, { useEffect } from "react";
import "../styles/Statistique.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Graphe from "./Graphe";
import axios from "axios";
export default function StatistiqueAdmin() {
  const user = useSelector((state) => state.tacheUserAPI);
  const userConnect = JSON.parse(localStorage.getItem("login"));
  const id = userConnect._id;
  console.log(id);
  const tasks = useSelector((state) => state.projetReducer);
  localStorage.setItem("projet", JSON.stringify(tasks));

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/tachesProjet/userTaches/${id}`)
      .then((res) => {
        // Mettre à jour la constante "tasks" avec les nouvelles données
        const data = res.data;
        // setTasks(data);
        console.log(data);
      });
  }, [id]);
  return (
    <div>
      <Link to="/index">
        <button
          type="button"
          style={{
            border: "none",
            cursor: "pointer",
            padding: "8px",
            color: "blue",
            fontSize: "14px",
            margin: "10px",
          }}
        >
          Retour
        </button>
      </Link>
      <div className="statistique">
        <Link to="/dashbord/projet">
          <div className="sg1">
            <i class="fa-solid fa-laptop-code projet"></i>
            <span>{tasks.length}</span>
            <p>Total de Projets</p>
          </div>
        </Link>
        <div className="sg1">
          <i class="fa-solid fa-laptop-code projet"></i>
          <span>{user.length}</span>
          <p>Total d'utilisateurs</p>
        </div>

        <div className="sg1">
          <i class="fa-solid fa-laptop-code projet"></i>
          <span>{tasks.length}</span>
          <p>Projets BackLog</p>
        </div>

        <div className="sg1">
          <i class="fa-solid fa-laptop-code projet"></i>
          <span>{tasks.length}</span>
          <p>Projets Terminés</p>
        </div>
      </div>

      <div className="animation">
        <div className="ag">
          <Graphe />
        </div>
        <div className="ag">
          <Graphe />
        </div>
      </div>
    </div>
  );
}
