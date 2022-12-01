const { httpError } = require("../helpers/handleErrors");

const ProductsService = require("../services/products");
const PORT = process.env.PORT || 8080;

class ProductsController {
  constructor() {
    this.servicio = new ProductsService();
  }

  getProducts = async (req, res) => {
    const username = req.user.username;
    const name = req.session.passport.user;
    // console.log(name)
    try {
      let products = await this.servicio.listAllProducts();
      await res.render("mainViewUsers", {
        // await res.render("admin", {
        products: products,
        username: username,
      });
    } catch (e) {
      httpError(res, e);
    }
  };

  adminAddProduct = async (req, res) => {
    const username = req.user.username;
    const name = req.session.passport.user;
    // console.log(name)
    try {
      let products = await this.servicio.listAllProducts();
      await res.render("admin", {
        products: products,
        username: username,
      });
    } catch (e) {
      httpError(res, e);
    }
  };

  getProduct = async (req, res) => {
    const id = req.params.id;
    try {
      let product = await this.servicio.listOneProduct(id);
      res.render("mainViewUsers", { products: product });
    } catch (err) {
      res.render("404");
    }
  };

  getProductCategory = async (req, res) => {
    const category = req.params.category;
    try {
      let product = await this.servicio.listProductsCategory(category);
      res.render("mainViewUsers", { products: product });
      // res.send(product);
    } catch (err) {
      res.render("404");
    }
  };

  createProduct = async (req, res) => {
    const data = req.body;
    // console.log(req.body)
    try {
      await this.servicio.createProducts(data);
      res.redirect(`/products`);
    } catch (e) {
      httpError(res, e);
    }
  };

  updateProduct = (req, res) => {};

  deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await this.servicio.deleteOneProduct(id);
      res.send("Producto Eliminado");
    } catch (err) {
      res.send("FAILEDD");
    }
  };
}

module.exports = { ProductsController };