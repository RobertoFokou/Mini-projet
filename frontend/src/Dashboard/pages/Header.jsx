import React from "react";
import "../styles/header.css";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
// import profil from "../../../images/Ellipse.png";
// import { useSelector } from "react-redux";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("login"));
  return (
    <div className="global">
      <div className="welcome">
        <div className="seach">
          <input type="texte" placeholder="rechercher"></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="profil">
          <div className="icons">
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-message"></i>
          </div>
          <p style={{margin: "10px", color: "white"}}>
            {" "}
            <strong>{user?.nom + " " }</strong> 
            <strong>{user?.prenom}</strong>
          </p>
          <img
            src={`http://localhost:5000/${user?.photo}`}
            alt=""
          ></img>
        </div>
      </div>
    </div>
  );
}
