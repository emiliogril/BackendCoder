const mongoose = require("mongoose");
const { MongooseContainer } = require("../container/ContainerMongoose");

const dtoOrderScheme = new mongoose.Schema(
  {
    numberOfOrder: { type: String, required: true },
    products: Array,
    date: { type: Date, required: true },
    state: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamp: true, __v: false }
);

class DaoOrderMongoose extends MongooseContainer {
  constructor() {
    super("orders", dtoOrderScheme);
  }

  async save(obj) {
    let col = await this.schema.create(obj);
    await col.save();
  }

  async getAll() {
    return await this.schema.find({}).lean();
  }
  async deleteAll() {
    await this.schema.deleteMany({});
  }
}

module.exports = DaoOrderMongoose;