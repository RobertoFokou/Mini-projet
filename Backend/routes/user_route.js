const express = require("express");
const router = express.Router();
const {
  createUser,
  findUser,
  UpdateUser,
} = require("../controlleurs/user_controller");
const upload = require("../images/uploads");

router.route("/add").post(upload.single("photo"), createUser);
router.post("/connexion", findUser);
router.route("/:id").put(UpdateUser);
module.exports = router;
