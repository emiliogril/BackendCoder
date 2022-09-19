const ContenedorMongoDB = require("../../clases/mongoDBClass.js");
var ObjectId = require("mongodb").ObjectId;

const { MongoClient } = require("mongodb");

const mongo = new MongoClient(
  "mongodb+srv://delvalj:Joaquin712@cluster0.vznga.mongodb.net/?retryWrites=true&w=majority"
);
mongo.connect();

class CarritoDaoMongo extends ContenedorMongoDB {
    constructor() {
        super('ecommerce', 'carrito');
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
        nombre: producto.nombre,
        price: producto.price,
        code: producto.code,
        thumbnail: producto.thumbnail,
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
      .find()
      .toArray();
    console.log(resultado);
    return resultado;
  }

  /**
   * Metodo para obtener un usuario segun su ID 
   * @param {Integer} id recibo por parametro el id del usuario que voy a eliminar
   * @returns 
   */
  async getById(id) {
    try {
      const resultado = await mongo
        .db(this.nombreTabla)
        .collection(this.nombreCollection)
        .find({ _id: ObjectId(id) })
        .toArray();
      console.log(resultado);
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Metodo para actualizar un usuario.
   * @param {Integer} id recibo por parametros el id del usuario que voy a actualizar .
   * @param {Object} producto  recibo por parametros un objeto usuario con la nueva informacion.
   * @returns 
   */
  async updateById(id, producto) {
    try {
      const resultado = await mongo
        .db(this.nombreTabla)
        .collection(this.nombreCollection)
        .updateOne(
          { "_id" : ObjectId(id) },
          {
            "$set" : { 
              "nombre": producto.nombre,
              "price": producto.price,
              "code": producto.code,
              "thumbnail": producto.thumbnail,
            },
          }
        );
      return resultado;
    } catch (error) {
      console.log(error);
    }
  }

/**
 * Metodo para eliminar un usuario segun su ID.
 * @param {Integer} id obtengo el id del usuario que quiero eliminar.
 * @returns 
 */
  async deleteById(id) {
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

module.exports = CarritoDaoMongo;   