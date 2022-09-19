const fs = require("fs");
// import moment from 'moment';
const moment = require("moment"); // require

// Check if the file exists
let fileExists = fs.existsSync("productos.txt");
console.log("productos.txt exists:", fileExists);
// If the file does not exist
// create it
if (!fileExists) {
  console.log("Creating the file");
  fs.writeFileSync("productos.txt", "[]");
  console.log("Archivo productos.txt Creado!");
}

const Contenedor = require("../../clases/productoClass");   

class ProductosDaoMemoria extends Contenedor {
  constructor() {
    super("productos.txt");
  }

  /**
   * @param {json} producto
   * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
   */
  async metodoSave(producto) {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      producto.id = contenido.length + 1;
      producto.timestamp = moment().format("MMMM Do YYYY, h:mm:ss a");

      contenido.push(producto);
      await fs.promises.writeFile(
        this.nombreArchivo,
        JSON.stringify(contenido)
      );
      console.log("El Id del Producto es " + producto.id);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Metodo para obtener todos los productos
   */
  async getAll() {
    try {
      const contenido = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      console.log(contenido);
      return contenido;
    } catch (error) {
      console.log("Error en getAll", error);
      return [];
    }
  }
  /**
   * Metodo para obtener un producto con su ID
   * @param {int} id el id del producto
   * @returns
   */
  async getById(id) {
    try {
      const contenidoCrudo = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      return contenidoCrudo.find((p) => p.id === id);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    let array = [];

    try {
      const contenidoCrudo = JSON.parse(
        await fs.promises.readFile(this.nombreArchivo)
      );
      array.push(contenidoCrudo);
      let prodId = contenidoCrudo.filter((p) => p.id !== id);
      // const arrayDeleteado = array.splice(prodId);
      // const jsLibraries = ['react', 'redux', 'vue', 'D3', 'Chart']
      const arrayDeleteado = array.filter((item) => item !== prodId);
      await fs.promises.writeFile(
        "productos.txt",
        JSON.stringify(arrayDeleteado)
      );
      return arrayDeleteado;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteAll() {
    const arrayVacio = [];
    try {
      await fs.promises.writeFile("productos.txt", JSON.stringify(arrayVacio));
      return arrayVacio;
    } catch (e) {
      console.log(e);
    }
  }
}
module.exports = ProductosDaoMemoria;