const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const app = express();
const conectarDB = require("./database/db");
const router = require("./routes/index");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
const localStrategy = require("./passport/local");
const jwtStrategy = require("./passport/jwt");

//Middleware, es un bloque de codigo que se ejecuta entre la peticion del usuario (request) hasta que
// la peticion llega al servidor

//const api = process.env.API_URL

//middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan("dev"));

//passport middlewares
passport.use("local", localStrategy);
passport.use("jwt", jwtStrategy);

//cloudinary config
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.APY_KEY, 
  api_secret: process.env.API_SECRET
});

//importar router o rutas
app.use("/", router)

const port = process.env.PORT;

//ejecutar conexcion a DB
conectarDB();

app.listen(port, () => {
  console.log(`mi servidor esta funcionando en el puerto ${port}`);
});
