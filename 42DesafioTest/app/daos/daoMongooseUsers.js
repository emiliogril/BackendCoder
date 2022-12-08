const mongoose = require("mongoose");
const { MongooseContainer } = require("../container/ContainerMongoose");

const dtoUsersScheme = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: Number, required: true },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamp: true, __v: false }
);

let instance = null;

class DaoUsersMongoose extends MongooseContainer {
  constructor(model) {
    super("user", dtoUsersScheme);
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

  async update(id, obj) {
    return await this.schema.updateOne(
      { _id: id },
      { $set: { products: obj } }
    );
  }

  getInstance() {
    if (!instance) instance = new DaoUsersMongoose();
    return instance;
  }
}

module.exports = DaoUsersMongoose;