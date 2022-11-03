const express = require("express");
const { Router } = express;
const routerLogin = Router();
const passport = require("../ej_passport.js");
const logger = require("../loggers");
const loginCheck = require("../middlewares/loginCheck");

routerLogin.get("/login", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});

routerLogin.post("/login", passport.authenticate("autenticacion", {
    failureRedirect: "/errorLogin",
    failureMessage: true,
  }),
  (req, res) => {
    req.session.name = req.body.username;
    logger.info("data Login");
    res.redirect("/");
  }
);

routerLogin.get("/errorLogin", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    logger.info("Error En el Login");
    res.render("errorLogin", {});
  }
});

routerLogin.get("/logout", loginCheck, (req, res) => {
  const user = req.session.name;
  req.session.destroy((err) => {
    console.log(err);
    res.render("logout", { user: user });
  });
});


module.exports = { routerLogin };
