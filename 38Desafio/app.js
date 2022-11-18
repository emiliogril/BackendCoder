const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, process.env.NODE_ENV + ".env"),
});

const express = require("express");
const cors = require("cors");
const app = express();

// -- Conection Socket -- //
const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

const { PORT } = require("./config/index");

const cp = require("cookie-parser");
const bodyParser = require("body-parser");

const session = require("express-session");
const passport = require("./app/middlewares/passport");
const isLogged = require("./app/middlewares/isLogged");
const logger = require("./app/helpers/loggers");

const { dbConnect } = require("./config/mongo.js");
const { engine } = require("express-handlebars");
const { DB_URI, SECRET } = process.env;

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
      maxAge: 1200000,
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
const RouterChat = require("./app/routes/chat");
const RouterOrder = require("./app/routes/order");

const DaoChatMongoose = require("./app/daos/daoChatMongoose");

const routerProducts = new RouterProducts();
const routerUsers = new RouterUsers();
const routerCart = new RouterCart();
const routerLogin = new RouterLogin();
const routerRegister = new RouterRegister();
const routerChat = new RouterChat();
const routerOrder = new RouterOrder();

const daoChatMongoose = new DaoChatMongoose();

// app.use("/api", require("./app/routes"));

app.use("/products", isLogged, routerProducts.config());
app.use("/users", isLogged, routerUsers.config());
app.use("/cart", isLogged, routerCart.config());
app.use("/", routerLogin.config());
app.use("/", routerRegister.config());
app.use("/chat", isLogged, routerChat.config());
app.use("/order", isLogged, routerOrder.config());

//---------------------------------//
// ------ Logout && 404 --------- //
//---------------------------------//

app.get("/logout", isLogged, (req, res) => {
  const username = req.user.username;
  req.session.destroy(() => {
    res.render("logout", { username: username });
  });
});

app.get("*", (req, res) => {
  res.render("404");
});

//---------------------------------//
// ------ CHAT SOCKET.IO --------- //
//---------------------------------//

socketServer.on("connection", async (socket) => {
  console.log("NUEVO USUARIO CONECTADO");
  let dataFromClassChat = await daoChatMongoose.getAll();
  socket.emit("messages", dataFromClassChat);
  socket.on("new_message", async (msg) => {
    await daoChatMongoose.save(msg);

    let dataFromClassChat = await daoChatMongoose.getAll();
    socketServer.sockets.emit("messages", dataFromClassChat);
  });
});

//---------------------------------//
// ------ db CONNECTION  --------- //
//---------------------------------//

dbConnect();
const server = httpServer.listen(PORT, () => {
  // console.log("API Running ", PORT);
  logger.info("API Running");
});

server.on("error", (err) => {
  console.log(err.message);
  logger.error("Error ");
});
