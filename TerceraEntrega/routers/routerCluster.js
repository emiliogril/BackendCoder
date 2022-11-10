const express = require("express");
const { Router } = express;
const routerCluster = Router();

const os = require("os");
const cpus = os.cpus().length;

routerCluster.get("/cluster", (req, res) => {
  console.log("router cluster get");
  res.send("Juegue la T");
});

routerCluster.get("/randoms", (req, res) => {
  res.send("Numero Random");
});

routerCluster.get("/info", (req, res) => {
  const info = {
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.tittle,
    sistema: process.platform,
    memory: process.memoryUsage.rss(),
    file: __dirname,
    cantidadProcesadores: cpus,
  };
  // info.keys = Object.keys(info);
  console.log(
    "Directorio actual de trabajo:" + process.cwd() + "\n",
    "Id del Proceso:" + process.pid + "\n",
    "Version de Node:" + process.version + "\n",
    "Titulo del proceso:" + process.tittle + "\n",
    "Sistema Operativo:" + process.platform + "\n",
    "Uso de la Memoria:" + process.memoryUsage.rss() + "\n",
    "Cantidad de Procesadores:" + cpus
  );
  res.send(info);
});

module.exports = { routerCluster };