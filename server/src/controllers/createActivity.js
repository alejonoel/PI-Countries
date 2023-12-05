const { Country , Activity } = require('../db');

const createActivityController = async ( id , nombre , difficulty , duration , season , countries) => {
    const newActivity = await Activity.create({ id , nombre , difficulty , duration , season });
    
    if (countries && countries.length > 0) {
        const postCountries = await Country.findAll({
            where: { name: countries }});
            
        //* El setCountries agrega los valores a la tabla de relacion muchas a muchas
        await newActivity.setCountries(postCountries); 
        return newActivity;
      } else {
        throw new error ('Debe agregar al menos un país')
      }
}

module.exports = createActivityController;