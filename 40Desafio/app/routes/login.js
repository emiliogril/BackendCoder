const { Router } = require("express");
const routerLogin = Router();
const passport = require("../middlewares/passport");

const { UsersController } = require("../controllers/login");

class RouterLogin {
  constructor() {
    this.controller = new UsersController();
  }

  config() {
    routerLogin.get("/", this.controller.getLogin);

    routerLogin.get("/errorLogin", this.controller.getErrorLogin);

    routerLogin.post(
      "/login",
      passport.authenticate("authenticate", {
        failureRedirect: "/errorLogin",
        failureMessage: true,
      }),
      this.controller.userLogin
    );
    return routerLogin;
  }
}

module.exports = RouterLogin;
