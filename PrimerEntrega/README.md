# Primer Entrega proyecto final

Este proyecto forma parte del trabajo final correspondiente al curso de **Programación Backend** dictado por **CoderHouse**.

Por un lado se encuentra el desarrollo de la api REST FULL del ecommerce y para poder probar la funcionalidad de la api.
Estas vistas son provisorias en esta entrega e irán cambiando a lo largo del curso adaptándose a la funcionalidad final.

### Ejecución

Luego de clonar o descargar el repositorio e instalar todas las dependencias con `npm install`, existen dos comandos para levantar el proyecto.
Para levantarlo en modo de desarrollo junto a nodemon, utilizar `npm start`

### Vistas

Hay 2 páginas servidas desde el espacio público que proveen una manera amena de probar la api REST.
Estas vistas se encuantran en las rutas:

- **/productos.js** : sería el panel de administrador, donde está el listado de productos y puedo ver, modificar, crear, y borrar productos. Filtrando la búsqueda por distintas maneras

- **/carritos.js** : es donde simulo el funcionamiento de los carritos. No va a quedar así para el final porque el manejo como está hecho no es para un consumidor. Es más para probar ahora las funciones de la api. Se pueden crear carritos, borrarlos, recorrer distintos carritos, agregar productos con las cantidades deseadas y borrar por completo un producto del carrito o modificar su cantidad desde el mismo. También tiene todo el tema de filtrado y búsqueda de productos útil para el usuario.


### Api

Consiste en las siguientes rutas:

#### Router /api/productos

- GET: **/api/productos/:id?** - Me permite listar todos los productos disponibles ó un producto por su id (disponible para usuarios y administradores)
- POST: **/api/productos/** - Para incorporar productos al listado (disponible para administradores)
- PUT: **/api/productos/:id** - Actualiza un producto por su id (disponible para administradores)
- DELETE: **/api/productos/:id** - Borra un producto por su id (disponible para administradores)

#### Router /api/carrito

- GET: **/api/carrito/** - Obtengo el listado de ids de los carritos existentes
- POST: **/api/carrito/** - Crea un carrito y devuelve su id.
- DELETE: **/api/carrito/:id** - Vacía un carrito y lo elimina por si id.
- GET: **/api/carrito/:id/productos** - Me permite listar todos los productos guardados en el carrito con determinado id
- POST: **/api/carrito/:id/productos** - Para incorporar productos al carrito por su id de carrito y el id de producto y cantidad (en el cuerpo de la petición)
- PUT: **/api/carrito/:id/productos** - Para actualizar un producto del carrito por su id de carrito y los datos a actualizar del producto (en el cuerpo de la petición)
- DELETE: **/api/carrito/:id/productos/:id_prod** - Eliminar un producto del carrito por su id de carrito y de producto
