import React from "react";
import "../styles/Statistique.css";
import { useSelector } from "react-redux";
export default function StatistiquUser() {
  const tasks = useSelector((state) => state.projetReducer);
  localStorage.setItem("projet", JSON.stringify(tasks));
  return (
    <div>
      <div className="statistique">
        <div className="s1">
          <div className="sg">
            <p>Nombre de projets crées:</p>
            <br />
            <span>{tasks.length}</span>
          </div>

          <div className="sd">
            <p>
              Nombre total de tâches <strong>Backlog</strong> :
            </p>
            <br />
            <span>50</span>
          </div>
        </div>
      </div>
      <div className="statistique2">
        <div className="s2">
          <div className="sg">
            <p>
              Nombre total de tâches <strong>Terminées</strong> :
            </p>
            <br />
            <span>20</span>
          </div>
        </div>
      </div>
    </div>
  );
}
