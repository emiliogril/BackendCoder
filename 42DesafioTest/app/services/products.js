const DaoProductsMongoose = require("../daos/daoMongoose");
const { DAO_TYPE: daoType } = require("../../config");
const { ProductDaoFactory } = require("../factory/daoProductsFactory");

class ProductsService {
  constructor() {
    this.dao = ProductDaoFactory.create(daoType)
  }

  test = () => {
    return 'JUEGUE LA T';
  };

   listAllProducts = async () => {
    let products = await this.dao.getAll();
    if (products === []) {
      return "No Products";
    }
    return products;
  };
  
   listOneProduct = async (id) => {
    let products = await this.dao.getById(id);
    if (products === []) {
      return "Producto con Id ";
    }
    return products;
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
    if(!id){
      res.send('Error en Eliminar producto.')
    }
    return await this.dao.deleteById(id);
  };
}

module.exports = ProductsService;