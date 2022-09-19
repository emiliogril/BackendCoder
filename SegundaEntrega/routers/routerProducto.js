const express = require("express");
const {Router} = express;
const routerProducto = Router();
const multer = require("multer");
const storage = multer({destinantion: "/upload"});

const DaoProduct = require("../daos/productos/productosDaoMemoria");

const products = new DaoProduct();

const middlewareAutenticacion = (req, res, next) => {
    req.user = {
        fullName: 'Joaquin Del Val',
        isAdmin: true
    };
    next();
}

const middlewareAutorizacion = (req, res, next) => {
    if (req.user.isAdmin) next();
    else res.status(403).send('Vos no tenes permisos');
}

routerProducto.get("/productos", middlewareAutenticacion, (req, res, next) => {
    const mostrarProductos = async () => {
        const showProductos = await products.getAll();
        res.send(showProductos);
    };
    mostrarProductos();
});

routerProducto.get("/productos/:id", middlewareAutenticacion, middlewareAutorizacion, (req, res, next) => {
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

routerProducto.post("/productos", productoSubido, middlewareAutenticacion, middlewareAutorizacion, async (req, res, next) => {
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

// routerProducto.delete("/productos/:id", middlewareAutenticacion, middlewareAutorizacion, (req, res) => {
//     let id = parseInt(req.params.id);
//     const eliminoPorID = async () => {
//         const productos = new productContainer("productos.txt");
//         const mostrarID = await productos.deleteById(id);
//         res.send(`elemento con el ${id} eliminado`);
//     };
//     eliminoPorID();
// })


routerProducto.delete("/productos", middlewareAutenticacion, middlewareAutorizacion, (req, res) => {
    const eliminoTodo = async () => {
        await products.deleteAll();
        res.send("Todos los productos han sido eliminados");
        
    };
    eliminoTodo();
})
module.exports = {routerProducto};
