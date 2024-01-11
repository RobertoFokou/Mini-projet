import React from "react";
import "../styles/header.css";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("login"));
  console.log(user.photo);
  return (
    <div className="global">
      <div className="welcome">
        <div className="seach">
          {/* <input type="texte" placeholder="rechercher"></input>
          <i className="fa-solid fa-magnifying-glass"></i> */}
        </div>

        <div className="profil">
          <div className="icons">
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-message"></i>
          </div>
          <p style={{ margin: "10px", color: " #7a7e8f;" }}>
            {" "}
            <strong>{user?.nom + " "}</strong>
            <strong>{user?.prenom}</strong>
            <br />
            <p>
              <strong>{user?.privilege}</strong>
            </p>
          </p>
          <img src={`http://localhost:5000/${user?.photo}`} alt=""></img>
        </div>
      </div>
    </div>
  );
}
