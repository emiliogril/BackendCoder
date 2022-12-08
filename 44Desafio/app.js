const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

const express = require("express");
const cors = require("cors");
const app = express();

const { PORT } = require("./config/index");

const cp = require("cookie-parser");
const bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("./app/middlewares/passport");

const { dbConnect } = require("./config/mongo.js");
const { engine } = require("express-handlebars");
const { DB_URI, SECRET } = process.env;

const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

const {
  getProducts,
  getProductById,
  addProduct,
  deleteOneProduct,
} = require("./resolvers/productResolver");

const {getUsers, getOneUser, createUser} = require("./resolvers/usersResolver")

const fs = require("fs");
const shcemaString = fs.readFileSync("./schemas/products.gql").toString();
const shcemaStringUsers = fs.readFileSync("./schemas/users.gql").toString();
const schemaCompilado = buildSchema(shcemaString);
const schemaCompiladoUsers = buildSchema(shcemaStringUsers);

const graphMiddleware = graphqlHTTP({
  schema: schemaCompilado,
  rootValue: {
    getProducts: getProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    deleteOneProduct: deleteOneProduct,
  },
  graphiql: true,
});

const graphMiddlewareUsers = graphqlHTTP({
  schema: schemaCompiladoUsers,
  rootValue: {
    getUsers: getUsers,
    getOneUser: getOneUser,
    createUser: createUser
    
  },
  graphiql: true,
});

app.use("/graphql", graphMiddleware);
app.use("/graphqlUser", graphMiddlewareUsers);

// Views Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

const MongoStore = require("connect-mongo");

app.set("views", __dirname + "/public/hbs_views");
app.set("view engine", "hbs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(cp());

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URI,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: SECRET,
    resave: true,
    // rolling: true,
    cookie: {
      maxAge: 90000,
    },
    saveUninitialized: true,
  })
);

app.use(passport.session());
app.use(passport.initialize());

const RouterProducts = require("./app/routes/products");
const RouterUsers = require("./app/routes/users");
const RouterCart = require("./app/routes/cart");
const RouterLogin = require("./app/routes/login");
const RouterRegister = require("./app/routes/session");

const routerProducts = new RouterProducts();
const routerUsers = new RouterUsers();
const routerCart = new RouterCart();
const routerLogin = new RouterLogin();
const routerRegister = new RouterRegister();

// app.use("/api", require("./app/routes"));
app.use("/products", routerProducts.config());
app.use("/users", routerUsers.config());
app.use("/cart", routerCart.config());
app.use("/", routerLogin.config());
app.use("/", routerRegister.config());

dbConnect();
const server = app.listen(PORT, () => {
  console.log("API Running ", PORT);
});

server.on("error", (err) => {
  console.log(err.message);
});