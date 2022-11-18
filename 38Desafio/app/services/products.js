// const DaoProductsMongoose = require("../daos/daoMongoose");
const { DAO_TYPE: daoType } = require("../../config");
const { ProductDaoFactory } = require("../factory/daoProductsFactory");

class ProductsService {
  constructor() {
    this.dao = ProductDaoFactory.create(daoType);
  }

  listAllProducts = async () => {
    let products = await this.dao.getAll();
    if (products === []) {
      return "No Products";
    }
    return products;
  };

  getAll = async () => {
    return await this.dao.getAll();
  };

  listOneProduct = async (id) => {
    let products = await this.dao.getById(id);
    if (products === []) {
      return "Producto con Id ";
    }
    return products;
  };

  listProductsCategory = async (category) => {
    let products = await this.dao.getAll();
    // console.log(products);

    const prodFiltered = products.filter((prod) => prod.category === category);
    console.log(prodFiltered);

    if (products === []) {
      return "Producto con Id ";
    }
    return prodFiltered;
  };

  createProducts = async (data) => {
    const { title, thumbnail, price, description, category } = data;
    const newProduct = {
      title: title,
      thumbnail,
      price,
      description,
      category,
    };

    await this.dao.save(newProduct);
    return newProduct;
  };

  deleteOneProduct = async (id) => {
    if (!id) {
      res.send("Error en Eliminar producto.");
    }
    return await this.dao.deleteById(id);
  };
}

module.exports = ProductsService;