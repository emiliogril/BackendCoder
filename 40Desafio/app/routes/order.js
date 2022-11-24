const { Router } = require("express");
const routerOrder = Router();

const isAdmin = require("../middlewares/isAdmin");

const { OrderController } = require("../controllers/order");

class RouterOrder {
  constructor() {
    this.controller = new OrderController();
  }

  config() {
    routerOrder.get("/", isAdmin, this.controller.getOrder);

    return routerOrder;
  }
}

module.exports = RouterOrder;