const express = require("express");
const router = express.Router();
const {
  createUser,
  findUser,
  UpdateUser,
  getAllUsers,
  getOneUser,
  getUserProjet
} = require("../controlleurs/user_controller");
const upload = require("../images/uploads");

router.route("/add").post(upload.single("photo"), createUser);
router.post("/connexion", findUser);
router.post("/getOne/:id", getOneUser);
router.route("/:id").put(UpdateUser);
router.route("/").get(getAllUsers)
router.route("/getUserProjet/:id").get(getUserProjet)
module.exports = router;
