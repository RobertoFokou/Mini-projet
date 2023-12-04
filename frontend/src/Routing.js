import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskContext from "./compoments/TaskContext";
import Accueil from "./compoments/Accueil";
import AddTasks from "./compoments/AddTasks";
import React, { useState } from "react";
import data from "./data/data";
import { v4 as uuidv4 } from "uuid";
import AllTache from "./Services/AllTaches";
import AddTache from "./Services/AddTache";
import UpdateTache from "./Services/UpdateTache";
import Inscription from "./Authentification/Inscription";
import Connexion from "./Authentification/Connexion";
import Index from "./Dashboard/Devellopeurs/Index";
import AjouterTaches from "./Dashboard/Devellopeurs/Ajouter";
import AfficherTaches from "./Dashboard/Devellopeurs/Afficher";
import ModiferTache from "./Dashboard/Devellopeurs/Modifier";
import Profil from "./Dashboard/Devellopeurs/Profil";
import Modifier_Profil from "./Dashboard/Devellopeurs/Modifier_Profil";
import StatistiqueAdmin from "./Dashboard/Projets/StatistiqueAdmin";
import StatistiquUser from "./Dashboard/Projets/StatistiqueUtilisateur";
import AfficherProjet from "./Dashboard/Projets/AfficherProjets";
import AjouterProjet from "./Dashboard/Projets/AjouterProjet";
import ModiferProjet from "./Dashboard/Projets/ModifierProjet";

export default function Routing() {
  const user = JSON.parse(localStorage.getItem("login"));
  let privilege = user?.privilege;
  const [tache, setTache] = useState(data);
  // console.log(data);
  function add(title, nom) {
    setTache((state) => {
      const newTask = {
        id: uuidv4(),
        title: title,
        nom: nom,
      };
      return [...state, newTask];
    });
    console.log(tache);
  }

  function deleteTask(id) {
    const updatedTasks = tache.filter((task) => task.id !== id);
    setTache(updatedTasks);
  }
  return (
    <TaskContext.Provider value={{ tache, add, deleteTask }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Connexion />} />
          <Route path="/inscrire" element={<Inscription />} />
          <Route path="/index" element={<Accueil />} />
          <Route path="/ajouter" element={<AddTasks />} />
          <Route path="/gerer" element={<AllTache />} />
          <Route path="/add" element={<AddTache />} />
          <Route path="/gerer/update/:id" element={<UpdateTache />} />

          <Route
            path="/dashbord"
            element={
              <>
                {" "}
                <Index />{" "}
              </>
            }
          >
            <Route path="ajout" element={<AjouterTaches />} />
            <Route path="all_taches" element={<AfficherTaches />} />
            <Route path="update/:id" element={<ModiferTache />} />
            <Route path="modifier/:id" element={<ModiferProjet />} />
            <Route path="profil" element={<Profil />} />
            <Route path="update_Profil" element={<Modifier_Profil />} />
            {privilege === "Admin" && (
              <Route path="statistique" element={<StatistiqueAdmin />} />
            )}
            {privilege === "Developpeur" && (
              <Route path="statistique" element={<StatistiquUser />} />
            )}
            <Route path="projet" element={<AfficherProjet />} />
            <Route path="ajouter" element={<AjouterProjet />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TaskContext.Provider>
  );
}
