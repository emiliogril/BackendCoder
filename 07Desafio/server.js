const express = require('express')

const app = express()

const frase = 'Hola mundo, como están?'

app.get('/api/frase', (req, res) => {
    res.json({
        frase
    })
})
app.get('/api/letras/:num', (req, res) => {
    const { num } = req.params
    const letra = frase[num-1]
    console.log(letra)
    // const letra = frase.split('')[num]
    res.json({
        letra,
        num
    })
})
app.get('/api/palabras/:num', (req, res) => {
    const { num } = req.params
    const numero = Number(num)
    console.log(isNaN(numero))
    if ((typeof numero === 'number') && (!isNaN(numero))) {
        const palabra = frase.split(' ')[numero-1]
        res.json({
            palabra,
            numero
        })
    }else{
        res.json({
            error: 'El parametro debe ser un número'
        })
    }
})

const PORT = process.env.PORT || 4000
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${server.address().port}`)
})
