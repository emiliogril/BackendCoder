const mongoose = require('mongoose');

class MongooseContainer {
    constructor (collection, schema) {
      this.schema = mongoose.model(collection, schema)
    }
}

module.exports = {MongooseContainer};