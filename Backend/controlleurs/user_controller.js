const Utilisateur = require("../models/users_model");
const upload = require("../images/upload");
const bcrypt = require('bcrypt')

// Creation et enregistrement d'un utilisateur
const createUser = async (req, res) => {
    try {
      const { password, ...userData } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new Utilisateur({
        ...userData,
        password: hashedPassword,
        photo: req?.file?.path || "",
      });
  
      await user.save();
  
      return res.status(201).json({ status: "success", Utilisateur: user });
    } catch (error) {
      console.log(error);
      return res.status(200).json({ status: "erreur", erreur: error.message });
    }
  };
