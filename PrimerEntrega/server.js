const express = require('express')
const { Router } = express
const Producto = require("./routes/producto")
const Carrito = require("./routes/carrito")

const producto = new Producto('./data/productos.json')
const carrito = new Carrito('./data/carrito.json')
const administrador = true

const app = express()
const routerProductos = Router()
const routerCarrito = Router()

//server
const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${server.address().port}`);
})

// Ruta
app.use(express.json())
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
server.on('error', (err) => console.log(err))


// PRODUCTOS -
// GET (Devuelve todos los productos)

routerProductos.get('/', async (req, res) => {
    const listaProductos = await producto.getAll()
    res.json(listaProductos)
})

//GET (Devuelve un producto según ID)

routerProductos.get('/:id', async (req, res) => {

    const { id } = req.params
    const productoById = await producto.getById(parseInt(id))
    productoById ?
        res.json(productoById)
        :
        res.json({ error: 'Producto no encontrado' })
})

//POST (Recibe y Agrega un producto)

routerProductos.post('/', async (req, res) => {
    if (administrador) {
        const idProduct = await producto.save(req.body)
        const productoById = await producto.getById(parseInt(idProduct))
        res.json(productoById)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos, Método POST, No autorizado"
        })
    }
})

//PUT (Recibe y Actualiza un producto según su ID)

routerProductos.put('/:id', async (req, res) => {
    if (administrador) {
        const { id } = req.params
        const respuesta = await producto.updateById(parseInt(id), req.body)
        res.json(respuesta)
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método PUT, No autorizado"
        })
    }
})

//DELETE (Elimina un producto según su ID)

routerProductos.delete('/:id', async (req, res) => {
    if (administrador) {
        const { id } = req.params
        await producto.deleteById(parseInt(id))
    }
    else {
        res.json({
            error: -1,
            description: "Ruta api/productos/id, Método DELETE, No autorizado"
        })
    }
})

//Rest of the routes

routerProductos.get('*', async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
})


//CARRITO

//POST: '/' (Crea un carrito y devuelve su ID)

routerCarrito.post('/', async (req, res) => {
    const idCarrito = await carrito.save(req.body)
    res.json(idCarrito)
})

//DELETE: '/:id' (Vacia un carrito y lo elimina)

routerCarrito.delete('/:id', async (req, res) => {
    const { id } = req.params
    await carrito.deleteById(parseInt(id))
})

//GET: '/:id/productos' (Listar todos los productos de un carrito)

routerCarrito.get('/:id/productos', async (req, res) => {
    const { id } = req.params
    const carritoById = await carrito.getById(parseInt(id))
    listaProductos = carritoById.products
    res.json(listaProductos)
})

//POST: '/:id/productos' (Incorporar productos al carrito)

routerCarrito.post('/:id/productos', async (req, res) => {
    const { id } = req.params
    const productoParaAgregar = req.body
    carritoById = await carrito.addProductToCart(id, productoParaAgregar)
    res.json(carritoById)
})

//DELETE: '/:id/productos/:id_prod' (Eliminar un producto del carrito)

routerCarrito.delete('/:idCart/productos/:idProduct', async (req, res) => {
    const { idCart, idProduct } = req.params
    await carrito.deleteProductById(parseInt(idCart), parseInt(idProduct))
})

//Rest of the routes

routerCarrito.get('*', async (req, res) => {
    res.json({
        error: -2,
        description: "Ruta no implementada"
    })
})