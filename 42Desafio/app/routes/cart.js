const { Router } = require("express");
const routerCart = Router();

const { CartController } = require("../controllers/cart");

class RouterCart {
  constructor() {
    this.controller = new CartController();
  }

  config() {
    routerCart.get("/", this.controller.getCart);

    routerCart.post("/comprar", this.controller.comprarProduct);

    routerCart.post("/:username/:id", this.controller.addProductCart);
    
    routerCart.post("/:id", this.controller.deleteCartProduct);
    return routerCart;
  }
}

module.exports = RouterCart;