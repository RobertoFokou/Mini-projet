import React from "react";
import "../styles/Statistique.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function StatistiqueAdmin() {
  const user = useSelector((state) => state.tacheUserAPI);
  const tasks = useSelector((state) => state.projetReducer);
  localStorage.setItem("projet", JSON.stringify(tasks));
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
        <div className="s1">
          <Link to="/dashbord/projet">
            <div className="sg">
              <p>Nombre total de Projets :</p>
              <br />
              <span>{tasks.length}</span>
            </div>
          </Link>

          <div className="sd">
            <p>Nombre total d'utilisateurs :</p>
            <br />
            <span>{user.length}</span>
          </div>
        </div>
      </div>
      <div className="statistique2">
        <div className="s2">
          <div className="sg">
            <p>
              Nombre total de tâches <strong>Backlog</strong> :
            </p>
            <br />
            <span>20</span>
          </div>

          <div className="sd">
            <p>
              Nombre total de tâches <strong>Terminées</strong> :
            </p>
            <br />
            <span>50</span>
          </div>
        </div>
      </div>
    </div>
  );
}
