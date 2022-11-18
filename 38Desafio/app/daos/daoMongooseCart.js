const mongoose = require("mongoose");
const { MongooseContainer } = require("../container/ContainerMongoose");

const dtoCartScheme = new mongoose.Schema(
  {
    userCart: { type: String, required: true },
    products: Array,
  },
  { timestamp: true, __v: false }
);

let instance = null;

class DaoCartMongoose extends MongooseContainer {
  constructor() {
    super("cart", dtoCartScheme);
    this.model = mongoose.model("cart", dtoCartScheme);
  }

  async createCart(user) {
    const cart = new this.model();
    cart.userCart = user;
    return cart;
  }

  async addProduct(userCart, prod) {
    await this.update(userCart, prod);
  }

  async save(obj) {
    let col = await this.schema.create(obj);
    await col.save();
  }

  async getById(id) {
    return await this.schema.find({ _id: id }).lean();
  }

  async getAll() {
    return await this.schema.find({}).lean();
  }

  async deleteById(id) {
    await this.schema.deleteOne({ _id: id });
  }
  
  async deleteAll() {
    await this.schema.deleteMany({});
  }

  async update(userCart, obj) {
    return await this.schema.updateOne(
      { userCart: userCart },
      { $set: { products: obj } }
    );
  }

  getInstance() {
    if (!instance) instance = new DaoCartMongoose();
    return instance;
  }
}

module.exports = DaoCartMongoose;