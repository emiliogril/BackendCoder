const express = require("express");
// const {faker} = require("@faker-js/faker");
const {Router} = express;
const routerProducto = Router();
const multer = require("multer");
const storage = multer({destinantion: "/upload"});

const PORT = process.env.PORT || 8081;

const dotenv = require("dotenv");
dotenv.config();

const logger = require('../loggers');

let prodContainer = require('../daos/daoMongoose.js')

const productoSubido = storage.fields([
    {title: "title", thumbnail: "thumbnail", price: "price", code: 'code'},
]);

routerProducto.post("/agregoProducto", productoSubido, async (req, res) => {
    let produc = new prodContainer("clase-36-zentregable", 'productos');
    if (
        req.body.title === "" ||
        req.body.price === "" ||
        req.body.thumbnail === "" ||
        req.body.code === ""
    ) {
        res.status(400).send({
            error: "No se pudo cargar el producto. Complete los campos vacios.",
        });
        logger.error('Error en Carga del Producto');
    } else {
        await produc.metodoSave(req.body);
        res.redirect(`http://localhost:${PORT}`);
    }
});

routerProducto.post("/eliminoProducto", async (req, res) => {
    let produc = new prodContainer("clase-36-zentregable", 'productos');
    if (
        req.body.title === "" ||
        req.body.price === "" ||
        req.body.thumbnail === "" ||
        req.body.code === ""
    ) {
        res.status(400).send({
            error: "No se pudo cargar el producto. Complete los campos vacios.",
        });
        logger.error('Error en Carga del Producto');
    } else {
        await produc.deleteById(req.body);
        res.redirect(`http://localhost:${PORT}`);
    }
});

module.exports = {routerProducto};