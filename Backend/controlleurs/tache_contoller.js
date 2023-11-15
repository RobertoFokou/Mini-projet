const Tache = require("../models/tache_model");

// Creation et enregistrement d'une tache

const createTache = async (req, res) => {
  const tache = new Tache(req.body);
  try {
    const result = await tache.save();
    res.status(201).send({ data: result });
  } catch (error) {
    res.status(500).send({
      error: error,
      message: "erreur lors d'ajour de la tache",
    });
  }
};

// Afficher toutes les taches
const getAllTaches = async (req, res) => {
  const tache = await Tache.find();
  res.send(tache);
};

// supprimer une tache
const deleteOneTache = async (req, res) => {
  const tacheId = req.params.id;
  try {
    await Tache.findByIdAndRemove(tacheId);
    console.log("suppression éffectuée avec success");
    return res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    console.log("erreur lors de la suppression");
    console.log(error);
  }
};

module.exports = {
  createTache,
  getAllTaches,
  deleteOneTache,
};
