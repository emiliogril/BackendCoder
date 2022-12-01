const { httpError } = require("../helpers/handleErrors");

const { UsersService } = require("../services/users");
const PORT = process.env.PORT || 8080;


class UsersController {
  constructor() {
    this.servicio = new UsersService();
  }

  getUsers = async (req, res) => {
    try {
      let users = await this.servicio.listAllUsers();
      res.send(users);
      // res.render("register", { users: users });
    } catch (e) {
      httpError(res, e);
    }
  };

  getUser = async (req, res) => {
    const id = req.params.id;
    // console.log(id);
    try {
      let user = await this.servicio.listOneUser(id);
      res.send(user);
    } catch (err) {
      res.send("FAILEDDD");
    }
  };

  createUser = async (req, res) => {
    const data = req.body;
    try {
      await this.servicio.createNewUser(data);
      res.redirect(`/login`);
    } catch (e) {
      httpError(res, e);
    }
  };

  updateUser = (req, res) => {};

  deleteUser = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      await this.servicio.deleteOneUser(id);
      // await containerProducts.deleteById(product);
      res.send("User deleted");
    } catch (err) {
      res.send("FAILEDD");
    }
  };
}

module.exports = { UsersController };
