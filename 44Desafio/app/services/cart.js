const DaoCartMongoose = require("../daos/daoMongooseCart");
const DaoProductsMongoose = require("../daos/daoMongoose");

class CartService {
  constructor() {
    this.dao = new DaoCartMongoose();
    this.daoProd = new DaoProductsMongoose();
  }

  listAllProducts = async () => {
    let products = await this.dao.getAll();
    if (products === []) {
      return "Carrito Vacio";
    }
    return products;
  };

  addProductCart = async (data) => {
    const { username, id } = data;

    let carritos = await this.dao.getAll();
    let usersCart = await carritos.filter(
      (carrito) => carrito.userCart === username
    );
    // console.log(usersCart);
    let prod = await this.daoProd.getById(id);
    console.log(prod, "soy el producto");

    if (usersCart[0].products.length <= 0) {
      await usersCart[0].products.push(prod[0]);
      await this.dao.addProduct(username, prod[0]);
      // await this.dao.save(productSave);
    } else {
      const newProducts = usersCart[0].products;
      await newProducts.push(prod[0]);
      await this.dao.addProduct(username, newProducts);
      console.log(usersCart[0].products);
    }

    // console.log(usersCart[0].products, "soy el userCart");
  };

  deleteOneProduct = async (id) => {
    if (!id) {
      res.send("Error en Eliminar producto.");
    }
    return await this.dao.deleteById(id);
  };
}

module.exports = { CartService };