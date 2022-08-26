const { options } = require("./options/mariaDB.js")
const knex = require("knex")(options);

knex.from("cars").where("price", "9000").update({price: 9500})
.then(() => console.log("car update"))
.catch((err) => console.log("car updated"))
.finally(() => {
    knex.destroy()
});