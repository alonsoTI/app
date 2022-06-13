//Llamada de paquetes
const express = require("express");
const mongoose = require("mongoose");
const usuarios = require("./routes/usuarios");
const productos = require("./routes/productos");
require("dotenv").config();
const path = require("path");

//Uso de swagger
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerSpecs = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentación API Certus",
      version: "1.0.0"
    },
    servers: [
      {
        url: "http://localhost:9000"
      }
    ]
  },
  apis: [ ` ${path.join(__dirname, "./routes/*.js")} ` ]
}

//Inicializando variables
const app = express();
const port = 9000;

//Configuraciones
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
})
app.use("/api", usuarios);
app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpecs)));


//Rutas
app.get('/', (req, res) => {
  res.send("Bienvenido al API Rest de Usuarios");
});

//Test MongoDB
mongoose.connect(process.env.mongodb_uri)
  .then(() => console.log("Conexión realizada a MongoDBAtlas"))
  .catch((error) => console.log(error))

//Servidor
app.listen(9000, () => console.log("Servidor escuchando en el puerto", port));