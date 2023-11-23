const Projet = require("../models/projets_model");

// creation et enregistrement d'un projet
const createProjet = async (req, res) => {
  const projet = new Projet(req.body);
  await projet
    .save()
    .then((data) => {
      console.log("nouveau projet enregistré avec succès");
      data.populate("developpeur").then((result) => {
        res.status(201).send(result);
      });
    })
    .catch((error) => {
      res.send({ error: error, msg: "le projet n'a pas été enregistré" });
    });
};

// Afficher tous les projets en fonction d'un utilisateur unique
const getOneProjets = async (req, res) => {
  const id = req.params.id;
  const projet = await Projet.find({ developpeur: id }).populate("developpeur");
  res.send(projet);
};

//Afficher tous les projets de la base de donnée
const getAllProjets = async (req, res) => {
  const projet = await Projet.find().populate("developpeur");
  res.send(projet);
};

// supprimer un projet
const deleteOneProjet = async (req, res) => {
  const projetId = req.params.id;
  console.log(projetId);
  try {
    await Projet.findByIdAndRemove(projetId);
    console.log("suppression éffectuée avec success");
    return res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    console.log("erreur lors de la suppression");
    console.log(error);
  }
};

// Mettre à jour les données
const UpdateProjet = async (req, res) => {
  const projetId = req.params.id;
  const data = req.body;
  try {
    const projet = await Projet.findById(projetId);
    if (!projet) {
      console.log("aucune projet trouvée à cet identifiant");
      return res.status(400).json({ Error });
    }
    projet.set(data);
    projet.updateOne({ _id: projetId }, data);
    await projet.save();
    console.log("la tâche a été mise à jour avec succès");
    res.status(200).json(projet);
  } catch (error) {
    console.log(error);
    console.log("echec de la mise à jour");
    return res.status(400).json({ error });
  }
};

module.exports = {
  createProjet,
  getOneProjets,
  getAllProjets,
  deleteOneProjet,
  UpdateProjet,
};
