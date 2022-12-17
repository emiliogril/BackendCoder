require('dotenv').config();

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
    PORT: process.env.PORT,
    MONGO_URI: process.env.MONGO_URI || '',
}