// Handler que trae todos los paises

const { Country , Activity } = require('../db');

const getAllCountries = async ( req , res) => {
    const allCountries = await Country.findAll({
        // Pedirle a la query que incluya los elementos de la relacion muchos a muchos
        include: {
            model: Activity,
            attributes:['nombre'],
            through: { attributes: [] }},
    });
    res.json(allCountries)
}

module.exports = getAllCountries;