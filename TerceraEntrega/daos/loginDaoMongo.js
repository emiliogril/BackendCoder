const contenedorLogin = require("../clases/contenedorLogin.js");
const { MongoClient } = require("mongodb");

const { MONGOURL} = process.env;

const mongo = new MongoClient(
  MONGOURL
);
mongo.connect();

class LoginDaoMongo extends contenedorLogin {
  constructor() {
    super("clase-36-zentregable", "usuarios");
  }

  /**
   * Metodo para guardar un usuario.
   * Recibo un objeto usuario como param.
   * @param {Object} producto
   */

  async metodoSave(username, password, nombre, address, phone, age, image) {
    await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .insertOne({ username: username, password: password, nombre: nombre, address: address, phone, age, image});
  }

  /**
   * Metodo para obtener todos los usuarios
   * @returns
   */
  async getAll(username) {
    const resultado = await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .find({ username })
      .toArray();
    console.log(resultado);
    return resultado;
  }
}

module.exports = LoginDaoMongo;