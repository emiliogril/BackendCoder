const express = require("express");
const app = express();

const { routerProducto } = require('./routers/routerProducto')
const { routerCarrito } = require('./routers/routerCarrito');
const { routerMongoDB } = require('./routers/routerMongoDB');
const { routerFirebase } = require('./routers/routerFirebase');
const { routerProdSQL} = require('./routers/routerProdSQL');



//server
const PORT = process.env.PORT || 8080;

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// Router
app.use("/api", routerProducto);
app.use("/api", routerCarrito);
app.use("/api", routerMongoDB);
app.use("/api", routerFirebase);
app.use("/api", routerProdSQL);
app.use(function(req, res) {
    res.redirect("/");
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});




