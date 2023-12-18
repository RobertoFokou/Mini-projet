const mongoose = require("mongoose");

const status = new mongoose.Schema({
    Backlog : String, 
    Traiter :  String,
    Test :  String, 
    Terminer : String,
    Cours : String, 
});

module.exports = mongoose.model("status", status, "status");
