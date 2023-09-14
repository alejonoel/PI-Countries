const express = require("express");
const router = require("./routes/mainRouter");
const morgan = require("morgan"); 
const cors = require("cors");

const server = express();

server.use(morgan("dev"));
//para detectar la estructura json
server.use(express.json());
server.use(cors());

// rutas a utilizar
server.use(router);

module.exports = server;
