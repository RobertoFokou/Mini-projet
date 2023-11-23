const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const RouteUser = require("./routes/user_route");
const RouteTaches = require("./routes/tache_route");
const RouteProjets = require("./routes/projets_route");
require("dotenv").config();

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("connextion successfull");
  })
  .catch((Error) => {
    console.log(Error);
    console.log("====================================");
    console.log("echec de connexion");
    console.log("====================================");
  });

const corsOptions = {
  origin: ["http://localhost:3001", "http://localhost:3000"],
  // origin: ["http://192.168.0.114:4000"],
  credentials: true,
  allowedHeaders: ["sessionId", "content-type"],
  exposedHeaders: ["sessionId"],
  methods: "GET, POST, PUT, DELETE , UPDATE, PATCH",
  preflightContinue: false,
};

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api/users/", RouteUser);
app.use("/api/taches/", RouteTaches);
app.use("/api/projets/", RouteProjets);
app.use("/uploads/", express.static("uploads"));

module.exports = app;
