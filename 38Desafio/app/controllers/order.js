const { httpError } = require("../helpers/handleErrors");
const { OrderService } = require("../services/order");

class OrderController {
  constructor() {
    this.service = new OrderService();
  }

  getOrder = async (req, res) => {
    let AllOrders = await this.service.getAllOrders();
    res.send(AllOrders);
  };

  generateOrder = async (usersCart) => {
    const generatedOrder = await this.service.generateAndSaveOrder(usersCart);
    return generatedOrder;
  };
}

module.exports = { OrderController };