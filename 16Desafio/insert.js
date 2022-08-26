const { options } = require("./mariaDB/conexionDB")

const knex = require("knex")(options)

const cars =  [
    { name: "Audi", price: 52642 },
    { name: "Mercedes", price: 52642 },
    { name: "Skoda", price: 52642 },
    { name: "Volvo", price: 52642 },
    { name: "Bentley", price: 52642 },
    { name: "Citroen", price: 52642 },
    { name: "Hummer", price: 52642 },
    { name: "Volkswagen", price: 52642 },
]
