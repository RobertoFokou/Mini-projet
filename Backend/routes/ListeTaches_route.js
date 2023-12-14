const express = require("express");
const router = express.Router();
const {
  createTacheProjet,
  getOneTachesProjet,
  deleteOneTacheProjet,
  UpdateTacheProjet,
  getAllTachesProjet,
} = require("../controlleurs/ListeTatches_controller");

router.route("/add").post(createTacheProjet);
router.route("/:id/:id2").get(getOneTachesProjet);
router.route("/:id").delete(deleteOneTacheProjet);
router.route("/:id").put(UpdateTacheProjet);
router.route("/:id").get(getAllTachesProjet);

module.exports = router;
