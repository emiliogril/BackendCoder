const express = require("express");
const app = express();

const { routerProducto } = require("./routers/routerProducto")

//server
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Router
app.use("/api", routerProducto);
