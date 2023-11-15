const mongoose = require("mongoose")

const tache = new mongoose.Schema({
    titre : String,
    auteur: String,
    details: String,
    duree: Number,
    telephone: Number
})

module.exports = mongoose.model("taches", tache, "Gestion_taches")