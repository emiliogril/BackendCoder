const contenedorProducto = require("../clases/contenedorProducto.js");
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectId;


const { MONGOURL } = process.env;

const mongo = new MongoClient(MONGOURL);
mongo.connect();

class productosDaoMongo extends contenedorProducto {
  constructor() {
    super("clase-36-zentregable", "productos");
  }

  /**
   * Metodo para guardar un usuario.
   * Recibo un objeto usuario como param.
   * @param {Object} producto
   */

  async metodoSave(producto) {
    await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .insertOne({
        titulo: producto.title,
        thumbnail: producto.thumbnail,
        price: producto.price,
        code: producto.code,
      });
  }

  /**
   * Metodo para obtener todos los usuarios
   * @returns
   */
  async getAll() {
    const resultado = await mongo
      .db(this.nombreTabla)
      .collection(this.nombreCollection)
      .find({})
      .toArray();
    console.log(resultado);
    return resultado;
  }

  /**
 * Metodo para eliminar un usuario segun su ID.
 * @param {Integer} id obtengo el id del usuario que quiero eliminar.
 * @returns 
 */
   async deleteById(id) {
    // console.log('Soy el id', id)
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
}

module.exports = productosDaoMongo;