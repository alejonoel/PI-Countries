const { Country , Activity } = require('../db');

const getDetailByID = async ( req , res ) => {
    const { idCountry } = req.params 
    console.log (idCountry)
    
    const busqueda = await Country.findByPk(idCountry, {
        // Pedirle a la query que incluya los elementos de la relacion muchos a muchos
        include: {
            model: Activity,
            attributes:['nombre'],
            // through no toma la relación de muchos a muchos de la tabla
            through: { attributes: [] }},
    })
    res.json(busqueda)
    
};

module.exports = getDetailByID;