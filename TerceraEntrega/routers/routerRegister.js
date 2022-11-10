const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { Router } = express;
const routerRegister = Router();
const passport = require("../ej_passport.js");
const logger = require("../loggers");
const fs = require("fs");
const path = require("path");
const imagenesPath = require("../config/paths.js");
const nodemailer = require("nodemailer");

const twilio = require('twilio');

const { ACCOUNTSID, AUTHTOKEN, GMAIL } = process.env;
console.log(process.env.ACCOUNT_ASID)

const accountSid = ACCOUNTSID
const authToken = AUTHTOKEN

const client = (accountSid, authToken)


const multer = require("multer");
const upload = multer();

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


const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "emiliogril@gmail.com",
    pass: GMAIL,
  },
});

routerRegister.post(
  "/register",
  upload.single("image"),
  passport.authenticate("registracion", {
    failureRedirect: "/errorRegister",
    failureMessage: true,
  }),
  (req, res) => {
    fs.writeFileSync(
      path.join(imagenesPath, req.body.username + ".jpg"),
      req.file.buffer
    );

    try {
      const message = client.messages.create({
         body: 'Te has registrado en la aplicacion de coder de Emilio',
         from: 'whatsapp:+14155238886',
         to: '+54' + req.body.phone
      })
      console.log(message)
   } catch (error) {
      console.log(error)
   }

  // const direccionEmail = req.body.username + '@gmail.com';

    transport
      .sendMail({
        from: "emiliogril@gmail.com",
        to: "emiliogril@gmail.com",
        html: `<h1>Se ha registrado un nuevo Usuario ${req.body.username}</h1>`,
        subject: "Registro Usuario",
      })
      .then((result) => { 
        console.log(result);
      })
      .catch(console.log);
    logger.info("Usuario Registrado");
    res.redirect("/");
  }
);


module.exports = { routerRegister };