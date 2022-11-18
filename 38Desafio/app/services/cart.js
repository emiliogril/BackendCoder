const DaoCartMongoose = require("../daos/daoMongooseCart");
const DaoProductsMongoose = require("../daos/daoMongoose");

const { OrderController } = require("../controllers/order");

class CartService {
  constructor() {
    this.dao = new DaoCartMongoose();
    this.daoProd = new DaoProductsMongoose();
    this.controller = new OrderController();
  }

  listAllProducts = async (username) => {
    let allCarts = await this.dao.getAll();
    const carritoFound = allCarts.find(
      (carrito) => carrito.userCart == username
    );
    return carritoFound;
  };

  addProductCart = async (data) => {
    const { username, id } = data;
    let carritos = await this.dao.getAll();
    let usersCart = await carritos.filter(
      (carrito) => carrito.userCart === username
    );
    const productosEnCarrito = usersCart[0].products;
    // console.log(productosEnCarrito);

    // Para que no agregue de nuevo el producto
    const checkExist = (prod) => prod._id != id;
    const predect = productosEnCarrito.every(checkExist);
    // console.log(predect);

    let prod = await this.daoProd.getById(id);

    if (usersCart[0].products.length <= 0) {
      await usersCart[0].products.push(prod[0]);
      await this.dao.addProduct(username, prod[0]);
    } else if (predect === false) {
      return;
    } else {
      const newProducts = usersCart[0].products;
      await newProducts.push(prod[0]);
      await this.dao.addProduct(username, newProducts);
    }
  };

  deleteOneProduct = async (username, idProduct) => {
    const carritos = await this.dao.getAll();
    const carritoUser = carritos.filter(
      (carrito) => carrito.userCart === username
    );
    let products = carritoUser[0].products;
    const newProduct = products.filter((prod) => prod._id != idProduct);
    products = newProduct;
    this.dao.update(username, products);
  };

  deleteAllProductsFromCart = async (username) => {
    let carritos = await this.dao.getAll();
    let usersCart = await carritos.filter(
      (carrito) => carrito.userCart === username
    );
    let userOrder = await this.controller.generateOrder(usersCart);

    const products = [];
    this.dao.update(username, products);
  };
}

module.exports = { CartService };