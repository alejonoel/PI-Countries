const { Country , Activity } = require('../db');

const createActivityController = async ( id , name , difficulty , duration , season , countries) => {
    const newActivity = await Activity.create({ id , name , difficulty , duration , season });
    
    if (countries && countries.length > 0) {
        // Busca y guarda los paises por su ID
        const postCountries = await Country.findAll({
            // Busca los paises por sus ID
            where: { id: countries }});
        // Asocia las actividades con los paises
        //* El setCountries funciona por la conjuncion de las tablas muchas a muchas hechas w/sequelize
        await newActivity.setCountries(postCountries); 
        return newActivity;
      } else {
        throw new error ('Debe agregar al menos un país')
      }
}

module.exports = createActivityController;