const Tache = require("../models/tache_model");

// Creation et enregistrement d'une tache
const createTache  = (req, res) => {
  const tache = new Tache(req.body);
  tache
    .save()
    .then((data) => {
      // console.log("nouvelle tache enregistré avec succès");
      data.populate("developpeur").then((result) => {
        res.status(201).send(result);
      });
    })
    .catch((error) => {
      res.send({ error: error, msg: "tache pas enregistré" });
    });
};

// Afficher toutes les taches en fonction d'un utilisateur unique
const getOneTaches = async (req, res) => {
  const id = req.params.id
  const tache = await Tache.find({developpeur: id}).populate("developpeur");
  res.send(tache);
};


//Afficher toutes les taches de la base de donnée
const getAllTaches = async (req, res) =>{
  const tache = await Tache.find().populate("developpeur")
  res.send(tache)
} 

// supprimer une tache
const deleteOneTache = async (req, res) => {
  console.log(tacheId);
  try {
    await Tache.findByIdAndRemove(tacheId);
    console.log("suppression éffectuée avec success");
    return res.status(200).json({ msg: "delete successfully" });
  } catch (error) {
    console.log("erreur lors de la suppression");
    console.log(error);
  }
};

// Mettre à jour les données

const UpdateTache = async(req, res) =>{
  const tacheId = req.params.id
  const data = req.body
  try {
    const tache = await Tache.findById(tacheId)
    if(!tache){
      console.log("aucune tache trouvée à cet identifiant");
      return res.status(400).json({Error})
    }
    tache.set(data);
    tache.updateOne({_id: tacheId}, data)
    await tache.save()
    console.log("la tâche a été mise à jour avec succès");
    res.status(200).json(tache)
  } catch (error) {
    console.log(error);
    console.log("echec de la mise à jour");
    return res.status(400).json({error})
  }
}

module.exports = {
  createTache,
  getOneTaches,
  deleteOneTache,
  UpdateTache,
  getAllTaches
};
