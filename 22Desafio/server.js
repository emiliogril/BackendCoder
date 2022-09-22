const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const PORT = process.env.PORT || 8080;
const { routerProducto } = require("./routers/routerProd");

const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);
const Knex = require("knex").default;


//la session mongo
const session = require("express-session");
const cp = require("cookie-parser");
const MongoStore = require("connect-mongo");

const loginCheck = require("./middlewares/loginCheck");
app.use(cp());

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://emilio:emilio1@cluster0.efltjcq.mongodb.net/?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: "emilio",
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 60000,
    },
    saveUninitialized: false,
  })
);

// Router
app.use("/api", routerProducto);

// Views Engine
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
  })
);

app.set("views", "./hbs_views");
app.set("view engine", "hbs");

// Router
app.get("/login", (req, res) => {
    if (req.session.name) {
    res.redirect("/api");
    console.log(req.session.name)
    console.log(req.session)
  } else {
    res.render("login", {});
  }
});

app.post("/login",async (req, res) => {
  req.session.name = 'Emilio';
  res.redirect("/")
});

let prodContainer = require('./clases/contenedorProducto')
const {optionsMySQL} = require('./config/options.js')

app.get("/", loginCheck, async (req, res) => {
  req.session.name = 'Emilio';
  const productos = new prodContainer(optionsMySQL, 'articulos');
  const showProductos = await productos.getAll();
  res.render("main", { showProductos, user: req.session.name, });
});

app.get("/logout", loginCheck, ( req, res) => {
  const user = req.session.name
  req.session.destroy((err) => {
      console.log(err);
      res.render("logout" , {user: user})
  });
})

// CH A T
socketServer.on("connection", async (socket) => {
  socket.emit("messages", await contenedor.getAll());
  socket.on("new_message", async (mensaje) => {
    console.log(mensaje);
    await contenedor.metodoSave(mensaje);
    let mensajes = await contenedor.getAll();
    socketServer.sockets.emit("messages", mensajes);
  });
});
httpServer.listen(PORT, () => {
  console.log(`Corriendo server en el puerto ${PORT}!`);
});