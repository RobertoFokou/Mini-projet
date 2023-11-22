const Utilisateur = require("../models/users_model");
const upload = require("../images/uploads");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const getOneUser = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Utilisateur.findOne({
    $or: [{ telephone: id }, { email: id }],
  })
    .then((Utilisateur) => {
      console.log(Utilisateur);
      if (Utilisateur) {
        return res.status(200).json({ Utilisateur });
      } else {
        return res.status(400).json({ err: "user inexistant" });
      }
    })
    .catch((Error) => {
      return res.status(400).json({ err: "user not found" });
    });
};

const findUser = async function (req, res) {
  console.log(req.body);
  const { unique, password } = req.body;
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
      return (
        res.status(200).send({
          data: { Utilisateur: user, token: token },
          message: "success",
        }),
        console.log(token)
      );
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
};
