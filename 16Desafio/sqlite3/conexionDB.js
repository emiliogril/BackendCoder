const options = {
    client: "sqlite3",
    connection: {
        filename: "./database/mydb.sqlite",
        userNullAsDefault: true
    }
}

module.exports = { options}