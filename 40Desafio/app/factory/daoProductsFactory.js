const  DaoProductMongoose  = require("../daos/daoMongoose");

class ProductDaoFactory {
    static create(type) {
        switch (type) {
            case "MONGOOSE":
                return new DaoProductMongoose();
            default:
                throw new Error("NONE EXISTING TYPE");
        }
    }
}

module.exports = {ProductDaoFactory}