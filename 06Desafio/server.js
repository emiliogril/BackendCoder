const express = require ('express')
const Producto = require("./contenedor")

const producto = new Producto('./productos.txt')

const app = express()

const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

server.on('error', (err) => console.log(err))

app.get('/', (req,res)=>{
    res.send(
        `<h1 style="color:blue">Bienvenido al nuevo Servidor Express</h1>`
    )
})

app.get('/productos', async (req,res) => {
    const listaProductos = await producto.getAll()
    res.send(listaProductos)
})

app.get('/productoRandom', async (req,res) => {

    const listaProductos = await producto.getAll()    
    const productoRandom = listaProductos[Math.floor(Math.random()*listaProductos.length)]
    res.send(productoRandom)
})