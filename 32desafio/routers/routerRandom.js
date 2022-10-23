const express = require("express");
const { Router } = express;
const routerRandom = Router();
const { fork } = require("child_process");

routerRandom.get("/cant", (req, res) => {
  
  const cantidad = parseInt(req.params.cant) || 1e6;
  const forkeado = fork("config/calculoFork.js");
  forkeado.send(cantidad);
  forkeado.on("message", (msg) => {
   res.send(msg) 
  })
});

module.exports = { routerRandom };