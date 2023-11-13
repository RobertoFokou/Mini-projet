const mongoose = require("mongoose")

const tache = new mongoose.Schema({
    titre : String,
    auteur: String,
    details: String,
    duree: Number
})

module.exports = mongoose.model("taches", tache, "Gestion_taches")