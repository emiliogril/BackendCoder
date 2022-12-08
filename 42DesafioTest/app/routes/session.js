const { Router } = require("express");
const routerRegister = Router();
const passport = require("../middlewares/passport");
const { UsersController } = require("../controllers/login");

class RouterRegister {
  constructor() {
    this.controller = new UsersController();
  }

  config() {
    routerRegister.get("/register", this.controller.getRegister);
    routerRegister.get("/errorRegister", this.controller.getErrorRegister);

    routerRegister.post(
      "/register",
      passport.authenticate("register", {
        failureRedirect: "/errorRegister",
        failureMessage: true,
      }),
      this.controller.registerUser
    );
    return routerRegister;
  }
}
module.exports = RouterRegister;