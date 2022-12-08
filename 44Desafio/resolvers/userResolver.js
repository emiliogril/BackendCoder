const { UsersService } = require("../app/services/users");
const userService = new UsersService();

const getUsers = async () => {
  return await userService.listAllUsers();
};

const getOneUser = async (args) => {
  const { id } = args;
  return await userService.listOneUser(id);
};

const createUser = async (args) => {
  const { username, password, email, address, age, phone } = args;

  const newUser = {
    username,
    password,
    email,
    address,
    age,
    phone,
  };

  return await userService.createNewUser(newUser);
};

module.exports = { getUsers, getOneUser, createUser };