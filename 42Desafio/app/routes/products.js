const { Router } = require("express");
const routerProducts = Router();
const isLogged = require("../middlewares/isLogged");
const isAdmin = require("../middlewares/isAdmin");

const { ProductsController } = require("../controllers/products");

class RouterProducts {
  constructor() {
    this.controller = new ProductsController();
  }

  config() {
    routerProducts.get("/", this.controller.getProducts);

    //Agrego productos si soy el admnin
    routerProducts.get("/admin", isAdmin, this.controller.adminAddProduct);

    routerProducts.get("/:id", this.controller.getProduct);

    routerProducts.get("/category/:category", this.controller.getProductCategory);

    routerProducts.post("/", this.controller.createProduct);

    routerProducts.patch("/:id", this.controller.updateProduct);

    routerProducts.post("/:id", this.controller.deleteProduct);

    return routerProducts;
  }
}

module.exports = RouterProducts;