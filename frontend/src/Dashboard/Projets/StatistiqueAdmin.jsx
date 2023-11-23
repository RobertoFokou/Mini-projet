import React from "react";
import "../styles/Statistique.css";
import { useSelector } from "react-redux";
export default function StatistiqueAdmin() {
  const user = useSelector((state) => state.tacheUserAPI);
  return (
    <div>
      <div className="statistique">
        <div className="s1">
          <div className="sg">
            <p>Nombre total de Projets :</p>
            <br />
            <span>20</span>
          </div>

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