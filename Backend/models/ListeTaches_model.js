const mongoose = require("mongoose");

const ListeTache = new mongoose.Schema({
  titre: String,
  origine: String,
  details: String,
  duree: Number,
  auteur: String,
  statut : {type: String, default: "Backlog"},
  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projet",
  },
});

module.exports = mongoose.model("ListeTache", ListeTache, "Liste_Taches");
