const express = require("express");
const { Router } = express;
const routerProdSQL = Router();
const multer = require("multer");
const storage = multer({ destinantion: "/upload" });

let prodContainer = require("../clases/productoSQLClass");
const { optionsMySQL } = require("../config/options.js");

/** Obtener todos los productos de la BDD */
routerProdSQL.get("/productosSQL", async (req, res, next) => {
  const productos = new prodContainer(optionsMySQL, "articulos");
  const showProductos = await productos.getAll();
  res.send(showProductos);
});

/** Obtener un producto segun su ID. */
routerProdSQL.get("/productosSQL/:id", async (req, res, next) => {
  const id = parseInt(req.params.id);
  const productos = new prodContainer(optionsMySQL, "articulos");
  const showProductos = await productos.getById(id);
  res.send(showProductos);
});

/** Elimino un producto segun su ID que es obtenido por params. */

routerProdSQL.delete("/productosSQL/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const eliminoPorID = async () => {
    const productos = new prodContainer(optionsMySQL, "articulos");
    await productos.deleteById(id);
    res.send(`Producto con el ${id} eliminado`);
  };
  eliminoPorID();
});

/** Actualizo un producto segun el Id que obtenemos por params.*/

routerProdSQL.put("/productosSQL/:id", (req, res) => {
  let id = parseInt(req.params.id);
  const eliminoPorID = async () => {
    const productos = new prodContainer(optionsMySQL, "articulos");
    if (
      req.body.titulo === "" ||
      req.body.price === "" ||
      req.body.thumbnail === "" ||
      req.body.code === ""
    ) {
      res.status(400).send({
        error: "No se pudo cargar el producto. Complete los campos vacios.",
      });
    } else {
      await productos.updateById(id, req.body);
      res.send(`elemento con el ${id} actualizado`);
    }
  };
  eliminoPorID();
});

/** Lo guardo un producto en BDD MySQL. */
const productoSubido = storage.fields([
  { titulo: "title", thumbnail: "thumbnail", price: "price", code: "code" },
]);

routerProdSQL.post("/productosSQL", productoSubido, async (req, res) => {
  let produc = new prodContainer(optionsMySQL, "usuarios");
  if (
    req.body.titulo === "" ||
    req.body.price === "" ||
    req.body.thumbnail === "" ||
    req.body.code === ""
  ) {
    res.status(400).send({
      error: "No se pudo cargar el producto. Complete los campos vacios.",
    });
  } else {
    await produc.metodoSave(req.body);
    res.send("Producto Guardado!");
  }
});

module.exports = { routerProdSQL };