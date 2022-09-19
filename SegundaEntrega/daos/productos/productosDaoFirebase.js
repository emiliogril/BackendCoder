const admin = require("firebase-admin");
const serviceAccount = require("../../db/backendcoder-902df-firebase-adminsdk-89mkw-463720c8ed.json");

const ContenedorFirebase = require("../../clases/firebaseClass.js");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://coderback-74f26.firebase.io",
}, 'productos');

const db = admin.firestore();

class ProductosDaoFirebase extends ContenedorFirebase {
    constructor() {
        super('productos');
    }

     /**
   * Metodo para obtener todos los usuarios
   * @returns todos los usuarios
   */

  async getAll() {
    const query = db.collection(this.nombreCollection);
    const resultados = (await query.get()).docs;
    if (!resultados) {
      console.log("No users");
      return ('No users :(');
    } else {
      const result = resultados.map((resultado) => resultado.data());
      return result;
    }
  }

  /**
   * Metodo para guardar un usuario en BD.
   * @param {*} producto
   * @returns
   */
  async metodoSave(prod) {
    const query = db.collection(this.nombreCollection);
    const producto = query.doc(prod.nombre);
    // usuario.id = usuario.length + 1;
    const mostrarXPantalla = await producto.create({
        nombre: prod.nombre,
        price: prod.price,
        code: prod.code,
        thumbnail: prod.thumbnail
    });
    return mostrarXPantalla;
  }

  /**
   * Metodo para obtener un Usuario segun su ID, que a su vez, es obtenido por params.
   */

  async getById(doc) {
    const prodRef = db.collection(this.nombreCollection).doc(doc);
    const prod = await prodRef.get();
    if (!prod.exists) {
      console.log("No such document!");
    } else {
      const productoID = prod.data();
      console.log(productoID);
      return productoID;
    }
  }

  /**
   * Metodo Para elimiar un producto segun su nombre de producto que a su vez es obtenido por params
   * @param {*} doc
   * @returns
   */
  async deleteById(doc) {
    if (!doc) {
      console.log("No such User!");
    } else {
      await db.collection(this.nombreCollection).doc(doc).delete();
      return "Producto Eliminado";
    }
  }

  /**
   * Metodo para actualizar un producto.
   * @param {String} doc recibo el nombre del documento que quiero eliminar.
   * @param {Object} producto recibo la nueva informacion del producto.
   * @returns
   */
  async updateById(doc, producto) {

    const data = {
      nombre: producto.nombre,
      price: producto.price,
      code: producto.code,
      thumbnail: producto.thumbnail
    };

    // Add a new document in collection "Productos" with nombre de producto '
    const res = await db.collection(this.nombreCollection).doc(doc).set(data);
    return res.data;
  }

}

module.exports = ProductosDaoFirebase;