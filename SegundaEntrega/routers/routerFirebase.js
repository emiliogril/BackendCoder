const express = require("express");
const { Router } = express;
const routerFirebase = Router();

const DaoProduct = require ("../daos/productos/productosDaoFirebase");
const products = new DaoProduct();

/** Para obtener todos los usuarios de firebase y mostrarlos por pantalla */
routerFirebase.get("/firebase", (req, res, next) => {
  const mostraProductos = async () => {
    const showProductos = await products.getAll();
    res.send(showProductos);
  };
  mostraProductos();
});

/** Metodo para */
routerFirebase.post("/firebase", async (req, res, next) => {
  const subirProducto = async () => {
    await products.metodoSave(req.body);
  };
  next();
  subirProducto();
});


routerFirebase.get("/firebase/:doc", (req, res, next) => {
    let doc = (req.params.doc);
    const mostrarProdID = async () => {
      const showProductos = await products.getById(doc);
        res.send(showProductos);
    };  
    mostrarProdID();
});

routerFirebase.put("/firebase/:doc", (req, res, next) => {
  let doc = (req.params.doc);
  const mostrarProdID = async () => {
    const showProductos = await products.updateById(doc, req.body);
    console.log('Producto Actualizado')
      res.send(showProductos);
      return;
  };  
  mostrarProdID();
});

routerFirebase.delete("/firebase/:doc", (req, res, next) => {
    let doc = (req.params.doc);
    const eliminoPorID = async () => {
        await products.deleteById(doc);
    };
    eliminoPorID();
    next();
})

module.exports = { routerFirebase };