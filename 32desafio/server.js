const express = require("express");
const app = express();
const { engine } = require("express-handlebars");

const dotenv = require("dotenv");
dotenv.config();

const { MONGOURL, SECRET } = process.env;

// const PORT = process.env.PORT || Number(process.argv[2]) || 8080;
// const MODO = proces.argv[2] || 'fork';

const { routerProducto } = require("./routers/routerProd");
const { routerRandom } = require("./routers/routerRandom");
const { routerCluster } = require("./routers/routerCluster");
const { routerLogin } = require("./routers/routerLogin");
const { routerRegister } = require("./routers/routerRegister");
const { routerMain } = require("./routers/routerMain");

const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

//session mongo
const session = require("express-session");
const cp = require("cookie-parser");
const MongoStore = require("connect-mongo");

const passport = require("./ej_passport.js");

// Inicializadores
// const contenedorChat = require('./daos/chatDaoFirebase');
const contenedorChat = require("./daos/chatDaoMongo.js");
const contenedorLogin = require("./daos/loginDaoMongo.js");
const contenedor = new contenedorChat();


// minimist
const minimist = require("minimist");

const argv = process.argv.slice(2);
const parsed = minimist(argv, {
  alias: { p: "port", mo: "mode" },
  default: {
    port: 8080,
    mode: "fork",
  },
});

const { port, mode } = parsed;

// Middlewares
app.use(cp());

// Middleware para parsear el Body.
app.use(express.json());

// Hace lo mismo pero con dato de formularios. Un form en HTML viene en forma de URL encoded y esto lo trasnforma en formulario.
app.use(express.urlencoded({ extended: true }));

// Va a buscar en la carpeta PUBLIC si existe el archivo buscado.
app.use(express.static("public"));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGOURL,
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
    }),
    secret: SECRET,
    resave: false,
    rolling: true,
    cookie: {
      maxAge: 90000,
    },
    saveUninitialized: false,
  })
);

// Passport
app.use(passport.session());
app.use(passport.initialize());

// Router
app.use("/api", routerProducto);
app.use("/", routerLogin);
app.use("/", routerRegister);
app.use("/", routerMain);
// app.use("/api", routerRandom);
// app.use("/api", routerCluster);

app.use((req,res,next)=>{
  logger.warn("NONE EXISTING URL");
  res.sendStatus('404')
})

// LOG4JS
const logger = require("./loggers");

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

// CH A T Websockets
socketServer.on("connection", async (socket) => {
  socket.emit("messages", await contenedor.getAll());
  socket.on("new_message", async (mensaje) => {
    await contenedor.metodoSave(mensaje);
    let mensajes = await contenedor.getAll();
    socketServer.sockets.emit("messages", mensajes);
  });
});



// CLUSTER
const cluster = require("cluster");
const os = require("os");

const cpus = os.cpus().length;
const isMaster = cluster.isMaster;
const args = process.argv.slice(2);

if (mode === "fork") {
  app.use("/api", routerRandom);
  httpServer.listen(port, () => {
    console.log(
      `ESTOY FORK CORRIENDO EN EL PUERTO : http://localhost:${port} Y EN MODO ${process.env.NODE_ENV}`
    );
  });
}
if (mode === "cluster") {
  if (isMaster) {
    for (let i = 0; i < cpus; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      console.log(`Process with id: ${worker.process.pid} finished`);
    });
  } else {
    app.use("/test", routerCluster);
    httpServer.listen(port, () => {
      console.log(
        `ESTOY CLUSTER CORRIENDO EN EL PUERTO : http://localhost:${port} Y EN MODO ${process.env.NODE_ENV}`
      );
    });
  }
}
