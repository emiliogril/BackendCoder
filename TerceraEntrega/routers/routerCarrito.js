const express = require("express");
const { Router } = express;
const routerCarrito = Router();
const logger = require("../loggers");
const loginCheck = require("../middlewares/loginCheck");
let prodContainer = require("../daos/carritoDaoMongo.js");
// const { session } = require("passport");
const multer = require("multer");
const storage = multer({destinantion: "/upload"});

const nodemailer = require("nodemailer");
const twilio = require('twilio');

const { ACCOUNTSID, AUTHTOKEN, GMAIL } = process.env;

const accountSid = ACCOUNTSID
const authToken = AUTHTOKEN

const client = twilio(accountSid, authToken)

const PORT = process.env.PORT || 8081;

routerCarrito.get("/carrito", loginCheck, async (req, res) => {
  if(req.session.name) {
    const productosCarrito = new prodContainer("clase-36-zentregable", "carrito", req.session.name);
    const showProductosCarrito = await productosCarrito.getAll(req.session.name);
    res.render("carrito", {  user: req.session.name, showProductos: showProductosCarrito });
  }
  else {
    console.log('FUNCIONA?')
  }
});

routerCarrito.post("/agregarCarrito", async (req, res) => {
  let produc = new prodContainer("clase-36-zentregable", 'carrito', req.session.name);
  // debugger
  // console.log(req.body)
  if (
      req.body.title === "" ||
      req.body.price === "" ||
      req.body.thumbnail === "" ||
      req.body.code === "" ||
      req.session.name === ""
  ) {
      res.status(400).send({
          error: "No se pudo cargar el producto. Complete los campos vacios.",
      });
      logger.error('Error en Carga del Producto');
  } else {
      await produc.agregarCarrito(req.body, req.session.name);
      res.redirect(`http://localhost:${PORT}`);
  }
});

routerCarrito.post("/agregarCarrito", async (req, res) => {
  let produc = new prodContainer("clase-36-zentregable", 'carrito', req.session.name);
  // debugger
  // console.log(req.body)
  if (
      req.body.title === "" ||
      req.body.price === "" ||
      req.body.thumbnail === "" ||
      req.body.code === "" ||
      req.session.name === ""
  ) {
      res.status(400).send({
          error: "No se pudo cargar el producto. Complete los campos vacios.",
      });
      logger.error('Error en Carga del Producto');
  } else {
      await produc.agregarCarrito(req.body, req.session.name);
      res.redirect(`http://localhost:${PORT}`);
  }
});


routerCarrito.post("/eliminarCarrito", async (req, res) => {
  let produc = new prodContainer("clase-36-zentregable", 'carrito', req.session.name);
  debugger
  console.log(req.body)
  if (
      req.body.title === ""   ) {
      res.status(400).send({
          error: "No se pudo cargar el producto. Complete los campos vacios.",
      });
      logger.error('Error en Carga del Producto');
  } else {
      await produc.comprar(req.body.username);
      res.redirect(`http://localhost:${PORT}/carrito`);
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

routerCarrito.post("/comprar", async (req, res) => {
  let produc = new prodContainer("clase-36-zentregable", 'carrito', req.session.name);
      await produc.comprar(req.body.id);

      try {
        const message = client.messages.create({
           body: 'Has efectuado una compra en el sitio de Emilio. Gracias!',
           from: '+18438926708',
           to: '+54' + req.body.phone
        })
        console.log(message)
     } catch (error) {
        console.log(error)
     }

      transport
      .sendMail({
        from: "emiliogril@gmail.com",
        to: "emiliogril@gmail.com",
        html: `<h1>Se ha registrado una compra en el sitio web. ${req.body.username}</h1>`,
        subject: "Compra Efectuada",
      })
      .then((result) => {
        console.log(result);
      })
      .catch(console.log);
    logger.info("Compra efectuada");

      res.redirect(`http://localhost:${PORT}/`);
});


module.exports = { routerCarrito };