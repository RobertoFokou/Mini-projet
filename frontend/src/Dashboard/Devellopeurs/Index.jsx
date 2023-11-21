import React from "react";
import "../styles/index.css";
import { Outlet} from "react-router-dom";
import Navbar from "./Navbar";
import Header from "./Header";


export default function Index() {
  return (
    <div className="informe">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="body-container">
        <div className="head_info">
          <Header/>
        </div>
        <div className="section_clients">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

