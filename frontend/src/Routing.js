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
import Navbar from "./Dashboard/Navbar";

export default function Routing() {
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
          <Route path="/dashbord" element={<Navbar />} />
        </Routes>
      </BrowserRouter>
    </TaskContext.Provider>
  );
}
