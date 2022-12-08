const { httpError } = require("../helpers/handleErrors");
const DaoMongooseCart = require("../daos/daoMongooseCart");

const PORT = process.env.PORT || 8080;

class UsersController {
  constructor() {
    this.dao = new DaoMongooseCart();
  }

  getLogin = async (req, res) => {
    res.render("login", {});
  };

  userLogin = async (req, res) => {
    res.redirect(`/products`);
  };

  // getMainPage = async (req, res) => {
  //   const username = req.body.username;
  //   console.log(username)
  //   res.redirect(`/mainViewUsers`, );
  // };

  getErrorLogin = async (req, res) => {
    try {
      res.render("errorLogin", {});
    } catch (e) {
      httpError(res, e);
    }
  };

  getRegister = async (req, res) => {
    try {
      res.render("register", {});
    } catch (e) {
      httpError(res, e);
    }
  };

  getErrorRegister = async (req, res) => {
    try {
      res.render("errorRegister", {});
    } catch (e) {
      httpError(res, e);
    }
  };

  registerUser = async (req, res) => {
    try {
      const username = req.body.username;
      const cart = await this.dao.createCart(username);
      await this.dao.save(cart);
      res.redirect(`/login`);
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = {
  UsersController,
};