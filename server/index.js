const axios = require("axios");
const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const cargarBD = require('./src/controllers/cargarBD');

conn.sync({ force: true })
.then(() => cargarBD()) 
.then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
