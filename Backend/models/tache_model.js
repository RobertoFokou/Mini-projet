const mongoose = require("mongoose");

const tache = new mongoose.Schema({
  titre: String,
  origine: String,
  details: String,
  duree: Number,
  auteur: String,
  developpeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateurs",
  },
});

module.exports = mongoose.model("taches", tache, "Gestion_taches");
