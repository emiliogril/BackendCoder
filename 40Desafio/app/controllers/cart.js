// const { logger } = require("handlebars");
const { httpError } = require("../helpers/handleErrors");
const { CartService } = require("../services/cart");

const logger = require("../helpers/loggers");

const PORT = process.env.PORT || 8080;

class CartController {
  constructor() {
    this.service = new CartService();
  }
  getCart = async (req, res) => {
    const { username } = req.user;
    try {
      let carrito = await this.service.listAllProducts(username);
      let products = carrito.products;
      await res.render("carrito", {
        username: username,
        products: products,
      });
    } catch (e) {
      httpError(res, e);
      logger;
    }
  };

  addProductCart = async (req, res) => {
    let username = req.params.username;
    let id = req.params.id;
    let data = { username, id };

    try {
      await this.service.addProductCart(data);
      res.redirect(`/products`);
    } catch (e) {
      httpError(res, e);
      logger.error("ERROR adding product.");
    }
  };

  deleteCartProduct = async (req, res) => {
    const idProduct = req.params.id;
    const { username } = req.user;
    try {
      await this.service.deleteOneProduct(username, idProduct);
      res.redirect(`/cart`);
    } catch (err) {
      logger.error("Error Deleting one product");
    }
  };

  comprarProduct = async (req, res) => {
    const username = req.user.username;
    try {
      await this.service.deleteAllProductsFromCart(username);
      res.redirect(`/products`);
    } catch (err) {
      logger.error("Error Buying product");
    }
  };
}

module.exports = { CartController };