// SQL
const Knex = require("knex").default;

/**
 * Clase Contenedor de producto.
 * @type {module.Contenedor}
 * Constructor donde se pasan las opciones de conexion a BD y table el nombre de la tabla dentro de la BD.
 */
module.exports = class Contenedor {
  constructor(options, tabla) {
    this.knex = Knex({
      client: "mysql2",
      connection: options,
    });
    this.tabla = tabla;
  }
  /**
   * @param {json} producto
   * Metodo para guardar un producto. Al terminar de grabar, muestra por pantalla el ID del producto agregado.
   */
  async metodoSave(producto) {
    await this.knex("articulos").insert({
      nombre: producto.nombre,
      thumbnail: producto.thumbnail,
      price: producto.price,
      code: producto.code,
    });
  }
  /**
   * Metodo para obtener todos los productos */
  async getAll() {
    try {
      return await this.knex.select("*").from(this.tabla);
    } catch (error) {
      console.log("Error en getAll", error);
      return [];
    }
  }

  /** Metodo para obtener un producto segun su Id que a su vez es obtenido por params. */
  async getById(id) {
    try {
      return await this.knex.select("*").from(this.tabla).where({ id: id });
    } catch (error) {
      console.log("Error en getAll", error);
      return [];
    }
  }

  /** Metodo para actualizar un producto segun su Id que a su vez es obtenido por params. */
  async updateById(id, producto) {
    try {
      return await this.knex.select("*").from(this.tabla).where({ id: id }).update({
        titulo: producto.titulo,
        price: producto.price,
        thumbnail: producto.thumbnail,
        code: producto.code
      });
    } catch (error) {
      console.log("Error en getAll", error);
      return [];
    }
  }

  /** Metodo para eliminar un producto segun su Id que a su vez es obtenido por params. */
  async deleteById(id) {
    try {
      return await this.knex
        .select("*")
        .from(this.tabla)
        .where({ id: id })
        .del();
    } catch (error) {
      console.log("Error en getAll", error);
      return;
    }
  }
};
