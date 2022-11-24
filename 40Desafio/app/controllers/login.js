const { httpError } = require("../helpers/handleErrors");
const DaoMongooseCart = require("../daos/daoMongooseCart");
const nodemailer = require("nodemailer");
const logger = require("../helpers/loggers");
const { EMAIL, GMAIL } = process.env;

// const transport = require("../../config/transport");

const PORT = process.env.PORT || 9999;

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

      let transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: EMAIL,
          pass: GMAIL,
        },
      });

      await transport
        .sendMail({
          from: EMAIL,
          to: username,
          html: `<h1>Welcome ${req.body.username}. Thank u for registering!</h1> <br> <p> Dear ${req.body.username}. We are happy to have you here with us! SHOP online 24hs. </p>`,
          subject: "New User",
        })
        .then((result) => {
          console.log(result);
          logger.info("User Registered Successfully");
        })
        .catch(console.log);
      res.redirect(`/`);
    } catch (err) {
      // console.log(err);
      logger.error("Error Registering user");
    }
  };
}

module.exports = {
  UsersController,
};