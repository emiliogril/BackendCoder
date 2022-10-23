const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const { MongoClient } = require("mongodb");

const contenedorLogin = require("./daos/loginDaoMongo.js");
const contenedorLog = new contenedorLogin();

const {MONGOURL} = process.env;

const connectMongo = (async () => {
  const mongo = new MongoClient(
    MONGOURL
  );
  
  await mongo.connect();
  console.log("conectado a Mongo Atlas");

  passport.use(
    "registracion",
    new LocalStrategy(async (username, password, callback) => {
      const user = await contenedorLog.getAll(username);
      if (user.length !== 0)
        return callback(null, false, {
          message: "Already Registered",
        });
      const passwordBcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      contenedorLog.metodoSave(username, passwordBcrypt);
      const nuevoUsuario = [{ username, password: passwordBcrypt }];
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