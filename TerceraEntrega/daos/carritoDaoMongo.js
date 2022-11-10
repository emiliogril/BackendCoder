const contenedorCarrito = require("../clases/contenedorCarrito.js");
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;


const { MONGOURL } = process.env;

const mongo = new MongoClient(MONGOURL);
mongo.connect();

class carritoDaoMongo extends contenedorCarrito {
  constructor() {
    super("clase-36-zentregable", "carrito", "delvalj");
  }

  /**
   * Metodo para guardar un usuario.
   * Recibo un objeto usuario como param.
   * @param {Object} producto
   */

  async agregarCarrito(producto, username) {
    await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .insertOne({
        titulo: producto.titulo,
        thumbnail: producto.thumbnail,
        price: producto.price,
        code: producto.code,
        username: username,
      });
  }

  /**
   * Metodo para obtener todos los usuarios
   * @returns
   */
  async getAll(username) {
    const resultado = await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .find({username})
      .toArray();
    console.log(resultado);
    return resultado;
  }


  /**
 * Metodo para eliminar un usuario segun su ID.
 * @param {Integer} id obtengo el id del usuario que quiero eliminar.
 * @returns 
 */
   async eliminarCarrito(id) {
    console.log('Soy el id', id)
    try {
      const resultado = await mongo
        .db(this.nombreTabla)
        .collection(this.nombreCollection)
        .deleteOne({ _id: ObjectId(id) });
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

  async comprar(username) {
    const resultado = await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .find({username})
      .toArray();
    console.log(resultado);
    return resultado;
  }

}

module.exports = carritoDaoMongo;