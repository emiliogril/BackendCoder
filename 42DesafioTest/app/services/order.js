// const { logger } = require("handlebars/runtime");
const DaoOrderMongoose = require("../daos/daoOrderMongoose");
const logger = require("../helpers/loggers");
// const DaoProductsMongoose = require("../daos/daoMongoose");

class OrderService {
  constructor() {
    this.dao = new DaoOrderMongoose();
    // this.daoProd = new DaoProductsMongoose();
  }

  getAllOrders = async (username) => {
    const allOrders = await this.dao.getAll();
    return allOrders;
  };

  generateAndSaveOrder = async (usersCart) => {
    let allOrder = this.dao.getAll();
    let products = usersCart[0].products;
    const generatedOrder = {
      numberOfOrder: (await allOrder).length + 1,
      products,
      state: "GENERATED",
      date: new Date(),
      email: usersCart[0].userCart,
    };
    await this.dao.save(generatedOrder);
    logger.info("Order Created");
    return generatedOrder;
  };
}

module.exports = { OrderService };