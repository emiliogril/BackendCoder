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

const { Server: HttpServer } = require("http");
const { Server: SocketServer } = require("socket.io");
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

//session mongo
const session = require("express-session");
const cp = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { faker } = require("@faker-js/faker");

const passport = require("./ej_passport.js");

// Inicializadores
// const contenedorChat = require('./daos/chatDaoFirebase');
const contenedorChat = require("./daos/chatDaoMongo.js");
const contenedorLogin = require("./daos/loginDaoMongo.js");

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
const contenedor = new contenedorChat();

// Middlewares
const loginCheck = require("./middlewares/loginCheck");
app.use(cp());

// Middleware para parsear el Body. Sin esto no obtenemos el Body. SIEMPRE QUE USAMOS POST HAY QUE USARLO.
// El body llega como strings. Lo que hace el middleware es transformarlo en JSON y mandarlo a la funcion que debe controlarlo.
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
// app.use("/api", routerRandom);
// app.use("/api", routerCluster);

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

app.get("/login", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("login", {});
  }
});

app.get("/register", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("register", {});
  }
});

app.get("/errorRegister", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("errorRegister", {});
  }
});

app.get("/errorLogin", (req, res) => {
  if (req.session.name) {
    res.redirect("/");
  } else {
    res.render("errorLogin", {});
  }
});

app.get("/info", loginCheck, (req, res) => {
  const info = {
    port: process.port,
    path: process.cwd(),
    processId: process.pid,
    nodeVersion: process.version,
    titulo: process.tittle,
    sistema: process.platform,
    memory: process.memoryUsage.rss(),
    file: __dirname,
  };
  // info.keys = Object.keys(info);
  console.log(
    "Directorio actual de trabajo:" + process.cwd() + "\n",
    "Id del Proceso:" + process.pid + "\n",
    "Version de Node:" + process.version + "\n",
    "Titulo del proceso:" + process.tittle + "\n",
    "Sistema Operativo:" + process.platform + "\n",
    "Uso de la Memoria:" + process.memoryUsage.rss() + "\n"
  );
  res.send(info);
});

app.post(
  "/register",
  passport.authenticate("registracion", {
    failureRedirect: "/errorRegister",
    failureMessage: true,
  }),
  (req, res) => {
    console.log("en post register");
    const registerSuccess = "Registrado exitosamente. Ir a Login para ingresar";
    res.redirect("/");
  }
);

const armarMock = () => {
  return {
    nombres: faker.name.firstName(),
    apellidos: faker.name.lastName(),
    colores: faker.color.human(),
  };
};
const mocks = [];

app.post(
  "/login",
  passport.authenticate("autenticacion", {
    failureRedirect: "/errorLogin",
    failureMessage: true,
  }),
  (req, res) => {
    req.session.name = req.body.username;
    // res.render('main', { user: req.session.name , showProductos: mocks });
    res.redirect("/");
  }
);

app.get("/", loginCheck, async (req, res) => {
  let { cant = 5 } = req.query;
  for (let i = 0; i < cant; i++) {
    mocks.push(armarMock());
  }
  res.render("main", { user: req.session.name, showProductos: mocks });
});

app.get("/logout", loginCheck, (req, res) => {
  const user = req.session.name;
  req.session.destroy((err) => {
    console.log(err);
    res.render("logout", { user: user });
  });
});

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
      `ESTOY FORK CORRIENDO EN MODO FORK EL PUERTO : http://localhost:${port}`
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
        `ESTOY CLUSTER CORRIENDO EN MODO CLUSTER EL PUERTO : http://localhost:${port}`
      );
    });
  }
}

// Inicializar => node server.js -m cluster -p 3000
// forever start server.js -p 8083

// TERMINAL WINDOWS 
// CTRL SHIFT D 
// CTRL SHIFT W  
// ALT SHIFT D 

// MODO FORK
// pm2 start server.js --name="Server Fork" --watch 
// pm2 list

// MODO CLUSTER
// pm2 start server.js --name="Server Cluster" -i max  --watch
// pm2 start server.js --name="Server Cluster" -i max  --watch -- -- 8080

// EJERCICIO BALANCEADOR
// pm2 start server.js --name="Server Cluster Ejercicio Balanceador" -i max  --watch -- -- 8080
// pm2 start index --name="Server Fork Ejercicio Balanceador" --watch -- -- 8083

// pm2 restart all
// pm2 reset all
// pm2 stop all
