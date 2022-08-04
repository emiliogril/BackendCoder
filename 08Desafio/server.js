const express = require('express')
const morgan = require('morgan')

const app = express()

// load the cookie-parsing middlewares
app.use(express.static(__dirname + '/public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(morgan('dev'))

//error handler mensaje
app.use(function (err, req, res, next) {
    res.status(500).json({
        code: err.code,
        message: err.message,
        stack: err.stack
    })
})

//Ubicacion de rutas
const rProducts = require('./routes/products.js')
app.use('/api', rProducts)

const _port = 8080
app.listen(_port)