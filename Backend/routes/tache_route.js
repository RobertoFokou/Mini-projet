const express = require("express");
const router = express.Router();
const {
  createTache,
  getOneTaches,
  deleteOneTache,
  UpdateTache,
  getAllTaches,
} = require("../controlleurs/tache_contoller");

router.route("/add").post(createTache);
router.route("/:id").get(getOneTaches);
router.route("/:id").delete(deleteOneTache);
router.route("/:id").put(UpdateTache);
router.route("/").get(getAllTaches);

module.exports = router;
