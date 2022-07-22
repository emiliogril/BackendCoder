const contenedor = require('./contenedor');

bicicleta = new contenedor;

//empieza a cargar un producto
bicicleta.save({
    title: 'jersey',
    price: 6500,
    thumbnail: 'http....'}).then(id => console.log(id));

//encargo un nuevo producto por su id
bicicleta.getById(3).then(obj => console.log(obj));

//les muestro todos los productos en la consola
bicicleta.getAll().then(arr => console.log(arr));

//borro un producto por su Id
bicicleta.deleteById(2);

//borro todos los productos
bicicleta.deleteAll();