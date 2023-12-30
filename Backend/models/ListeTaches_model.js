const mongoose = require("mongoose");

const ListeTache = new mongoose.Schema({
  titre: String,
  origine: String,
  details: String,
  duree: Number,
  auteur: String,
  statut: String ,
  member: String,
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projet",
  },
  developpeur: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "utilisateurs",
  },
});

module.exports = mongoose.model("ListeTache", ListeTache, "Liste_Taches");
