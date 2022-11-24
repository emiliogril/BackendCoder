const mongoose = require("mongoose");
const { MongooseContainer } = require("../container/ContainerMongoose");

const dtoChatScheme = new mongoose.Schema(
  {
    email: { type: String, required: true },
    type: { type: String },
    date: { type: Date },
    text: { type: String },
  },
  {
    timestamps: true,
    __v: false,
  }
);
let instance = null;

class ChatDaoMongoose extends MongooseContainer {
  constructor() {
    super("messages", dtoChatScheme);
  }

  async save(obj) {
    let col = await this.schema.create(obj);
    await col.save();
  }

  async getAll() {
    return await this.schema.find({}).lean();
  }

  getInstance() {
    if (!instance) instance = new DaoProductsMongoose();
    return instance;
  }
}

module.exports = ChatDaoMongoose;
