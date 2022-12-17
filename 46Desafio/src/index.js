const Koa = require('koa');
const { PORT } = require('./config/globals');
const bodyParser = require('koa-bodyparser');

const productRoutes = require('./routes/product.routes');

const app = new Koa();

app.use(bodyParser());
app.use(productRoutes.routes()).use(productRoutes.allowedMethods());

app.listen(PORT);
console.log(`Application is running on port ${PORT}`)

// app.listen(5000, () => {
//     console.log("App is started on Port 5000")
// })