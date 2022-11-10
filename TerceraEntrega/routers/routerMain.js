const express = require("express");
const { Router } = express;
const routerMain = Router();
const logger = require("../loggers");
const loginCheck = require("../middlewares/loginCheck");

// compression
const compression = require("compression");

// faker
// const { faker } = require("@faker-js/faker");

routerMain.get("/info", (req, res) => {
  const info = {
    port: process.port,
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.tittle,
    sistema: process.platform,
    memory: process.memoryUsage.rss(),
    file: __dirname,
  };
  logger.info("Informacion Del Sistema");
  res.send(info);
});

routerMain.get("/infoComprimida", compression(), (req, res) => {
  const info = {
    port: process.port,
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.tittle,
    sistema: process.platform,
    memory: process.memoryUsage.rss(),
    file: __dirname,
  };
  // info.keys = Object.keys(info);
  console.log(
    "Directorio actual de trabajo:" + process.cwd() + "\n",
    "Id del Proceso:" + process.pid + "\n",
    "Version de Node:" + process.version + "\n",
    "Titulo del proceso:" + process.tittle + "\n",
    "Sistema Operativo:" + process.platform + "\n",
    "Uso de la Memoria:" + process.memoryUsage.rss() + "\n"
  );
  logger.info("Informacion Del Sistema Compirimida");
  res.send(info);
});

let prodContainer = require("../daos/productosDaoMongo.js");

routerMain.get("/", loginCheck, async (req, res) => {
  if (req.session.name) {
    const productos = new prodContainer("clase-36-zentregable", "productos");
    const showProductos = await productos.getAll();
    res.render("main", {
      user: req.session.name,
      showProductos: showProductos,
    });
  } else {
    res.render("login", {});
  }
});

module.exports = { routerMain };