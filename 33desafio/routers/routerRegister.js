const express = require("express");
const { Router } = express;
const routerRegister = Router();
const passport = require("../ej_passport.js");
const logger = require("../loggers");

routerRegister.get("/register", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("register", {});
  }
});

routerRegister.get("/errorRegister", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    logger.info("Error en Register");
    res.render("errorRegister", {});
  }
});

routerRegister.post(
  "/register",
  passport.authenticate("registracion", {
    failureRedirect: "/errorRegister",
    failureMessage: true,
  }),
  (req, res) => {
    logger.info('register Data')
    const registerSuccess = "Registrado exitosamente. Ir a Login para ingresar";
    res.redirect("/");
  }
);

module.exports = { routerRegister };