const mongoose = require('mongoose')

const projet = new mongoose.Schema({
    nom: String,
    details: String,
    dateCreation: String,
    dateLivraison: String,
    members: [],
    developpeur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "utilisateurs",
      },
});

module.exports = mongoose.model("projet", projet, "Projets")