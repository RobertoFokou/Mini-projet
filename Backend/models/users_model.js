const mongoose = require("mongoose");

const connexion = new mongoose.Schema({
  nom: String,
  prenom: String,
  telephone: { type: Number, require: true, unique: true },
  email: { type: String, require: true, unique: true },
  photo: { type: String },
  genre: String,
  password: String,
  privilege : {type: String, default: "Developpeur"}
});

module.exports = mongoose.model("utilisateurs", connexion, "Developpeur");
