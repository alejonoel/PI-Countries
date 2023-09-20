// Handler que trae todos los continentes

const { Country } = require('../db');

const getAllContinents = async ( req , res) => {
    const uniqueContinents = await Country.findAll({
        attributes: ['continent'],
        group:['continent']
    });


    const listOfContients = uniqueContinents.map((i) => i.continent)
    res.json(listOfContients)
}

module.exports = getAllContinents;