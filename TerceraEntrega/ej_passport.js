const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { MongoClient } = require("mongodb");

const contenedorLogin = require("./daos/loginDaoMongo.js");
const contenedorLog = new contenedorLogin();

const imagenesPath = require('./config/paths.js');
const path = require('path');

const {MONGOURL} = process.env;

const connectMongo = (async () => {
  const mongo = new MongoClient(
    MONGOURL
  );
  
  await mongo.connect();
  console.log("conectado a Mongo Atlas");

  passport.use(
    "registracion",
    new LocalStrategy({ passReqToCallback : true} , async (req, username, password, callback) => {
      const user = await contenedorLog.getAll(username);
      if (user.length !== 0) 
        return callback(null, false, {
          message: "Already Registered",
        });

      const imagePath = path.join('/uploads', req.body.username + '.jpg');
      const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      contenedorLog.metodoSave(username, passwordBcrypt, req.body.nombre, req.body.address, req.body.phone, req.body.age , imagePath);
      const nuevoUsuario = [{ username, password: passwordBcrypt, nombre: req.body.nombre, address: req.body.address, phone: req.body.phone, age: req.body.age , image: imagePath}];
      callback(null, nuevoUsuario);
    })
  );

  passport.use(
    "autenticacion",
    new LocalStrategy(async (username, password, callback) => {
      const user = await contenedorLog.getAll(username);
      console.log(username)
      if (user.length === 0 || !bcrypt.compareSync(password, user[0].password))
        return callback(null, false, {
          message: "error",
        });
      callback(null, user);
    })
  );

  passport.serializeUser((user, callback) => {
    callback(null, user[0].username);
  });

  passport.deserializeUser(async (username, callback) => {
    const user = await contenedorLog.getAll(username);
    callback(null, user);
  });
})();

module.exports = passport;