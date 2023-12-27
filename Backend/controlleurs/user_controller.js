const Utilisateur = require("../models/users_model");
const upload = require("../images/uploads");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Projet = require("../models/projets_model");

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

// Recuprer tous les utilisateur enregistés
const getAllUsers = async (req, res) => {
  const user = await Utilisateur.find();
  res.send(user);
};

// Recuprer tous les utilisateur appartenant à un projet
const getUserProjet = (req, res) => {
  const idArray = req.params.id.split(",").map((id) => id.replace(/"/g, "")); // Supprimez les guillemets autour des ID

  Utilisateur.find({ _id: { $in: idArray } })
    .then((utilisateurs) => {
      if (utilisateurs.length > 0) {
        return res.status(200).send({ utilisateurs, message: "success" });
      } else {
        return res
          .status(200)
          .json({ err: "utilisateurs inexistants", message: "echec" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res
        .status(400)
        .json({ error: "Erreur lors de la recherche des utilisateurs" });
    });
};

// Rechercher un utilisateur et ajouter son l'ajouter à un projet
const getOneUser = (req, res) => {
  const unique = req.body;
  const id = req.params.id;
  console.log(id);
  console.log(unique);
  Utilisateur.findOne({ email: unique.email })
    .then((utilisateur) => {
      if (utilisateur) {
        const userId = utilisateur._id;

        Projet.findById(id)
          .then((projet) => {
            if (projet) {
              // Vérifier si l'ID de l'utilisateur existe déjà dans le tableau members
              if (projet.members.includes(userId)) {
                return res
                  .status(200)
                  .json({ message: "L'utilisateur est déjà membre du projet" });
              }

              projet.members.push(userId); // Ajouter l'ID de l'utilisateur dans le tableau members
              projet
                .save()
                .then((projetUpdated) => {
                  return res.status(200).send({
                    utilisateur,
                    projet: projetUpdated,
                    message: "success",
                  });
                })
                .catch((error) => {
                  console.log(error);
                  return res
                    .status(500)
                    .json({ error: "Erreur lors de la mise à jour du projet" });
                });
            } else {
              return res.status(404).json({ message: "Projet non trouvé" });
            }
          })
          .catch((error) => {
            console.log(error);
            return res
              .status(500)
              .json({ error: "Erreur lors de la recherche du projet" });
          });
      } else {
        return res
          .status(200)
          .json({ err: "Utilisateur inexistant", message: "echec" });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(400).json({ error: "Utilisateur non trouvé" });
    });
};

// Connexion de l'utilisateur via l'email ou telephone et d'un password
const findUser = async function (req, res) {
  const { unique, password } = req.body;
  console.log(req.body);
  const payload =
    typeof unique === "string" ? { email: unique } : { telephone: unique };
  try {
    const user = await Utilisateur.findOne(payload);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          telephone: user.telephone,
          nom: user.nom,
          prenom: user.prenom,
          photo: user.photo,
          genre: user.genre,
          email: user.email,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      res.cookie("token", token);
      return res.status(200).send({
        data: { Utilisateur: user, token: token },
        message: "success",
      });
    } else {
      return res.status(200).json({
        error: "Numéro de téléphone, e-mail ou mot de passe incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error:
        "utilisateur inexistant (Numéro de téléphone, e-mail ou mot de passe incorrect)",
    });
  }
};

// Mettre à jour un utilisateur
const UpdateUser = async (req, res) => {
  const userId = req.params.id;
  const data = req.body;
  try {
    const user = await Utilisateur.findById(userId);
    if (!user) {
      console.log("aucun utilisateur trouvé à cet identifiant");
      return res.status(400).json({ Error });
    }
    user.set(data);
    user.updateOne({ _id: userId }, data);
    await user.save();
    console.log("la tâche a été mise à jour avec succès");
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    console.log("echec de la mise à jour");
    return res.status(400).json({ error });
  }
};

module.exports = {
  createUser,
  getOneUser,
  findUser,
  UpdateUser,
  getAllUsers,
  getUserProjet,
};
