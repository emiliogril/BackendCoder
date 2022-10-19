const express = require('express')
const compression = require('compression')

const app = express()
const port = 4000

// app.use(compression())

const data = ('hola mundo').repeat(1000000)

app.get('/', (req, res) => {
    console.log(data)
    res.send(data)
})


app.listen(port, err => {
    if (err) {
        console.log('Error', err)
    }
    console.log('Server is running on port 4000')
})

