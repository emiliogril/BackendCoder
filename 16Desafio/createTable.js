const { options } = require ("./mariaDB/conexionDB")

const knex = require ("knex") (options)

knex.schema.createTable("users", table =>{
    table.increments("id")
    table.string("name")
    table.string("email")
    table.string("password")
    table.integer("edad")
})

.then(() => console.log("table created"))
.catch((err) => { console.log(err); throw err})
.finally(() => {
    knex.destroy();
});