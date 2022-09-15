const express = require("express");
const {Router} = express;
const routerCarrito = Router();
const multer = require("multer");
const storage = multer({destinantion: "/upload"});

// const DaoProduct = require ("../daos/carrito/carritoDaoMemoria.js");
// const DaoProduct = require ("../daos/carrito/carritoDaoMongo.js");
const DaoProduct = require ("../daos/carrito/carritoDaoFirebase.js");

const products = new DaoProduct();

routerCarrito.get("/carrito", (req, res, next) => {
    const mostrarProductos = async () => {
        const showProductos = await products.getAll();
        res.send(showProductos);
    };
    mostrarProductos();
});

routerCarrito.get("/carrito/:id", (req, res, next) => {
    let id = parseInt(req.params.id);
    const mostrarProdID = async () => {
        const mostrarID = await products.getById(id);
        res.send(mostrarID);
    };
    mostrarProdID();
});

const productoSubido = storage.fields([
    {
        title: "title",
        price: "price",
        thumbnail: "thumbnail",
        description: "descripcion",
        codigo: null,
        stock: null
    },
]);

routerCarrito.post("/carrito", productoSubido, async (req, res, next) => {
    const subirProduct = async () => {
        if (
            req.body.title === "" ||
            req.body.price === "" ||
            req.body.thumbnail === "" ||
            req.body.description === "" ||
            req.body.codigo === "" ||
            req.body.stock === ""
        ) {
            return res.status(400).send({
                error: "No se pudo cargar el producto. Complete los campos vacios.",
            });
        } else {
            await products.metodoSave(req.body);
            return res.send(req.body);
        }
        next();
    };
    subirProduct();
});

routerCarrito.delete("/carrito/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const eliminoPorID = async () => {
        const mostrarID = await products.deleteById(id);
        res.send(`elemento con el ${id} eliminado`);
    };
    eliminoPorID();
})

module.exports = {routerCarrito};