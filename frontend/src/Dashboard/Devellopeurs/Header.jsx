import React from "react";
import "../styles/header.css";
import { useSelector } from "react-redux";
// import StickyNote2Icon from "@mui/icons-material/StickyNote2";
// import profil from "../../../images/Ellipse.png";
// import { useSelector } from "react-redux";
export default function Header() {
  const user = JSON.parse(localStorage.getItem("login"));
  // const tasks = useSelector((state) => state.tacheReducerAPI);
  // const taille = tasks.length;
  return (
    <div className="global">
      <div className="welcome">
        <div className="seach">
          <input type="texte" placeholder="rechercher"></input>
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>

        <div className="profil">
          <div className="icons">
            {/* <strong
              style={{
                color: "red",
                height: "15px",
                padding: "5px",
                paddingBottom: "25px",
                position: "relative",
                marginTop: "-8px",
                marginRight: "20px",
                fontSize: "20px"
              }}
            >
              {taille}
            </strong> */}
            <i className="fa-solid fa-bell"></i>
            <i className="fa-solid fa-message"></i>
          </div>
          <p style={{ margin: "10px", color: "white" }}>
            {" "}
            <strong>{user?.nom + " "}</strong>
            <strong>{user?.prenom}</strong><br/>
            <p><strong>{user?.privilege}</strong></p>
          </p>
          <img src={`http://localhost:5000/${user?.photo}`} alt=""></img>
        </div>
      </div>
    </div>
  );
}
