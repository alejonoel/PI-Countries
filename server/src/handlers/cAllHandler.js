// Handler que trae todos los paises

const { Country } = require('../db');

const getAllCountries = async ( req , res) => {
    const allCountries = await Country.findAll();
    res.json(allCountries)
}

module.exports = getAllCountries;