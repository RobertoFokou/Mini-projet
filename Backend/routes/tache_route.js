const express = require("express");
const router = express.Router();
const {
  createTache,
  getAllTaches,
  deleteOneTache,
} = require("../controlleurs/tache_contoller");

router.route("/add").post(createTache);
router.route("/").get(getAllTaches);
router.route("/:id").delete(deleteOneTache)

module.exports = router;
