const { httpError } = require("../helpers/handleErrors");
const { CartService } = require("../services/cart");

const PORT = process.env.PORT || 8080

class CartController {
  constructor() {
    this.controller = new CartService();
  }
  getCart = async (req, res) => {
    try {
      let products = await this.controller.listAllProducts();
      await res.render("carrito", {
        products: products,
      });
    } catch (e) {
      httpError(res, e);
    }
    // res.redirect("http://localhost:8080/login");
  };

  addProductCart = async (req, res) => {
    // const data = req.body;
    let username = req.params.username;
    let id = req.params.id;
    let data = { username, id}
    try {
      await this.controller.addProductCart(data);
      res.redirect(`/products`);
    } catch (e) {
      httpError(res, e);
    }
  };

  deleteCartProduct = async (req, res) => {
    const id = req.params.id;
    try {
      await this.controller.deleteOneProduct(id);
      res.send("Producto Eliminado");
    } catch (err) {
      res.send("FAILEDD");
    }
  };
}

module.exports = { CartController };

// // const name = req.session.passport.user;
// try {
//   let products = await listAllProducts();
//   await res.render("carrito", { products: products });
// } catch (e) {
//   httpError(res, e);
// }