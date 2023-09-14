const express = require('express');
const routerCountries = express.Router();
const getCountriesByName = require('../handlers/cByNameHandler')
const getDetailByID = require('../handlers/cByIDHandler');
const getAllCountries = require('../handlers/cAllHandler');


// Ruta que trae todos los paises
routerCountries.get("/", getAllCountries)

//Ruta buscador de coincidencias
routerCountries.get("/name", getCountriesByName)

// Ruta que obtiene el detalle de un pais por su ID
routerCountries.get("/:idCountry", getDetailByID)


module.exports = routerCountries;