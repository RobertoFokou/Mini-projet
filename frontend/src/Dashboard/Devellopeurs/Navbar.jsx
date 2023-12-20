import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../../images/logo.jpeg";
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("login"));
  let privilege = user?.privilege;
  const navigate = useNavigate();
  function deconnecter() {
    navigate("/");
    Cookies.remove("token");
    // localStorage.removeItem("login");
    window.location.reload();
  }
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className="container">
      <div>
        <div className="logo">
          <img src={logo} alt="logo" />
          <p>GateWayTaches</p>
        </div>
        <ul>
          {privilege === "Admin" && (
            <Link to="statistique" style={{ textDecoration: "none" }}>
              <li
                style={{
                  backgroundColor: selectedItem === 20 ? "red" : "#05153f",
                }}
                onClick={() => setSelectedItem(20)}
              >
                <i className="fa-solid fa-car"></i>Statistiques
              </li>
            </Link>
          )}
          {privilege === "Developpeur" && (
            <Link to="statistique" style={{textDecoration: "none"}}>
              <li
                style={{
                  backgroundColor: selectedItem === 3 ? "red" : "#05153f",
                }}
                onClick={() => setSelectedItem(3)}
              >
                <i className="fa-solid fa-car"></i>Statistiques
              </li>
            </Link>
          )}
          <Link
            to="all_taches"
            onClick={() => setSelectedItem(2)}
            style={{ textDecoration: "none" }}
          >
            <li
              style={{
                backgroundColor: selectedItem === 2 ? "red" : "#05153f",
              }}
              onClick={() => setSelectedItem(2)}
            >
              <i className="fa-solid fa-user-secret"></i>Accueil
            </li>
          </Link>
          <Link
            to="projet"
            onClick={() => setSelectedItem(9)}
            style={{ textDecoration: "none" }}
          >
            <li
              style={{
                backgroundColor: selectedItem === 9 ? "red" : "#05153f",
              }}
              onClick={() => setSelectedItem(9)}
            >
              <i class="fa-solid fa-layer-group"></i>Projets
            </li>
          </Link>
          <Link to="profil" style={{ textDecoration: "none" }}>
            <li
              style={{
                backgroundColor: selectedItem === 6 ? "red" : "#05153f",
              }}
              onClick={() => setSelectedItem(6)}
            >
              <i className="fa-solid fa-user"></i>Profil
            </li>
          </Link>
          <li
            style={{ backgroundColor: selectedItem === 7 ? "red" : "#05153f" }}
            onClick={() => setSelectedItem(7)}
          >
            <i className="fa-solid fa-gears"></i>Parametre
          </li>
          <li id="premium" onClick={deconnecter}>
            <i className="fa-solid fa-share-from-square"></i>Deconnexion
          </li>
          <div className="info">
            <span>version 1.0.0</span>
            <span>2023-2024</span>
          </div>
        </ul>
      </div>
    </div>
  );
}
