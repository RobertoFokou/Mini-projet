const express = require("express")
const router = express.Router()
const {route} = require("../app")
const { createTache } = require("../controlleurs/tache_contoller")

router.route("/add").post(createTache)

module.exports = route;