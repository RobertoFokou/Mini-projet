const express = require("express")
const router = express.Router()
const {createUser, findUser} = require("../controlleurs/user_controller")
const upload = require("../images/uploads")

router.route('/add').post(upload.single('photo'), createUser);
router.post('/connexion',findUser)
module.exports = router