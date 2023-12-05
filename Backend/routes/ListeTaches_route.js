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
router.route("/:id").get(getOneTachesProjet);
router.route("/:id").delete(deleteOneTacheProjet);
router.route("/:id").put(UpdateTacheProjet);
router.route("/").get(getAllTachesProjet);

module.exports = router;
