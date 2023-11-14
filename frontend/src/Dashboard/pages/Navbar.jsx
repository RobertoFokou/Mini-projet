import Cookies from "js-cookie";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css"

export default function Navbar() {
  const navigate = useNavigate();
  function deconnecter() {
    navigate("/");
    Cookies.remove("token");
    localStorage.removeItem("user");
    window.location.reload();
  }
  const [selectedItem, setSelectedItem] = useState(1);
  return (
    <div className="container">
      <div>
        <ul>
          <Link to="All_clients" onClick={() => setSelectedItem(2)}>
            <li
              style={{
                backgroundColor: selectedItem === 2 ? "red" : "#05153f",
              }}
              onClick={() => setSelectedItem(2)}
            >
              <i className="fa-solid fa-user-secret"></i>Accueil
            </li>
          </Link>
          <Link to="ReservationChef">
            <li
              style={{
                backgroundColor: selectedItem === 3 ? "red" : "#05153f",
              }}
              onClick={() => setSelectedItem(3)}
            >
              <i className="fa-solid fa-car"></i>Ajouter
            </li>
          </Link>
          <li
            style={{ backgroundColor: selectedItem === 6 ? "red" : "#05153f" }}
            onClick={() => setSelectedItem(6)}
          >
            <i className="fa-solid fa-user"></i>Profil
          </li>
          <li
            style={{ backgroundColor: selectedItem === 7 ? "red" : "#05153f" }}
            onClick={() => setSelectedItem(7)}
          >
            <i className="fa-solid fa-gears"></i>Parametre
          </li>
          <li id="premium" onClick={deconnecter}>
            <i className="fa-solid fa-share-from-square"></i>Deconnexion
          </li>
        </ul>
      </div>
    </div>
  );
}
