// DAO PRODUCTS
const mongoose = require("mongoose");
const { MongooseContainer } = require("../container/ContainerMongoose");

const dtoProductScheme = new mongoose.Schema(
  {
    title: { type: String , required: true },
    thumbnail: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity : {type : Number , required : true, default : 1 , min : 1}
  },
  { timestamp: true, __v: false }
);

let instance = null;

class DaoProductsMongoose extends MongooseContainer {
  constructor(model) {
    super("product", dtoProductScheme);
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

  getInstance(){
    if (!instance) instance = new DaoProductsMongoose()
    return instance
    }
}

module.exports = DaoProductsMongoose;
