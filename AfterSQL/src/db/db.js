const {Pool} = require("pg")

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: 1234,
    database: "ecommerce"
})

export default pool