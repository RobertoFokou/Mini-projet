const { sortArray } = require("../helpers");
const ListeTaches = require("../models/ListeTaches_model");
const Status = require("../models/status");
const { ObjectId } = require("mongoose");

// Creation et enregistrement d'une tache
const createTacheProjet = (req, res) => {
  const tache = new ListeTaches(req.body);
  tache
    .save()
    .then((data) => {
      if (data.projet && data.developpeur) {
        data
          .populate("projet")
          .populate("developpeur")
          .execPopulate()
          .then((result) => {
            res.status(201).send(result);
          });
      } else {
        res.status(201).send(data);
      }
    })
    .catch((error) => {
      res.send({ error: error, msg: "Tâche non enregistrée" });
    });
};

// Afficher toutes les taches en fonction d'un utilisateur et d'un projet unique
const getOneTachesProjet = async (req, res) => {
  const id = req.params.id;
  try {
    const taches = await ListeTaches.find({developpeur: id})
      .populate("developpeur")
      .populate("projet");

    let retObj = sortArray("statut", taches, [
      "Backlog",
      "A Traiter",
      "En Cours",
      "En Test",
      "Terminer",
    ]);

    res.send(retObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Une erreur s'est produite lors de la récupération des tâches.");
  }
};

//Afficher toutes les taches de la base de donnée
const getAllTachesProjet = async (req, res) => {
  const id = req.params.id;
  try {
    const taches = await ListeTaches.find({ projet: id })
      .populate("developpeur")
      .populate("projet");

    let retObj = sortArray("statut", taches, [
      "Backlog",
      "A Traiter",
      "En Cours",
      "En Test",
      "Terminer",
    ]);

    res.send(retObj);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Une erreur s'est produite lors de la récupération des tâches.");
  }
};

// supprimer une tache
const deleteOneTacheProjet = async (req, res) => {
  const tacheId = req.params.id;
  try {
    await ListeTaches.findByIdAndRemove(tacheId);
    console.log("suppression éffectuée avec success");
    return res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    console.log("erreur lors de la suppression");
    console.log(error);
  }
};

// Mettre à jour les données
const UpdateTacheProjet = async (req, res) => {
  const tacheId = req.params.id;
  const data = req.body;
  try {
    const tache = await ListeTaches.findById(tacheId);
    if (!tache) {
      console.log("aucune tache trouvée à cet identifiant");
      return res.status(400).json({ Error });
    }
    tache.set(data);
    tache.updateOne({ _id: tacheId }, data);
    await tache.save();
    // console.log("la tâche a été mise à jour avec succès");
    res.status(200).json(tache);
  } catch (error) {
    console.log(error);
    console.log("echec de la mise à jour");
    return res.status(400).json({ error });
  }
};

module.exports = {
  createTacheProjet,
  getOneTachesProjet,
  deleteOneTacheProjet,
  UpdateTacheProjet,
  getAllTachesProjet,
};
