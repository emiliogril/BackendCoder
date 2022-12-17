const { MongoClient } = require('mongodb');
const { MONGO_URI } = require('../config/globals');

const client =  new MongoClient(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect(err => {
  if(err){
    console.error(err);
    process.exit(-1);
  }
  console.log('Successfully connected to MongoDB');
});

module.exports = client;