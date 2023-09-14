// Handler buscador de coincidencias
const { Country } = require('../db');
const { Op } = require('sequelize');

const getCountriesByName = async (req, res) => {
    try {
        const { name } = req.query;
        console.log(name);
        const busqueda = await Country.findAll({
            where: {
                name: {
                    // iLike: indistinción entre mayúsculas/minúsculas
                    [Op.iLike]: `%${name}%`,
                }
            }
        });
        res.json(busqueda);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getCountriesByName;