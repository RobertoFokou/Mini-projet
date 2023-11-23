const express = require("express");
const router = express.Router();
const {
  createProjet,
  getAllProjets,
  getOneProjets,
  UpdateProjet,
  deleteOneProjet,
} = require("../controlleurs/projets_controller");
router.route("/add").post(createProjet);
router.route("/").get(getAllProjets);
router.route("/:id").get(getOneProjets);
router.route("/:id").put(UpdateProjet);
router.route("/:id").delete(deleteOneProjet);

module.exports = router;
