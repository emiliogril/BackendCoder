const { Router } = require("express");
const routerUsers = Router();

const {
  UsersController
} = require("../controllers/users");

class RouterUsers {
  constructor() {
    this.controller = new UsersController();
  }
  config() {
    // routerProducts.get("/", this.controller.getProducts);

    routerUsers.get("/", this.controller.getUsers);
    routerUsers.get("/:id", this.controller.getUser);
    routerUsers.post("/", this.controller.createUser);
    routerUsers.patch("/:id", this.controller.updateUser);
    routerUsers.delete("/:id", this.controller.deleteUser);

    return routerUsers;
  }
}

module.exports = RouterUsers;