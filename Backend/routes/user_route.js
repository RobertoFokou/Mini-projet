const express = require("express");
const router = express.Router();
const {
  createUser,
  findUser,
  UpdateUser,
  getAllUsers
} = require("../controlleurs/user_controller");
const upload = require("../images/uploads");

router.route("/add").post(upload.single("photo"), createUser);
router.post("/connexion", findUser);
router.route("/:id").put(UpdateUser);
router.route("/").get(getAllUsers)
module.exports = router;
