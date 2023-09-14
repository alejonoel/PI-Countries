const { Activity } = require('../db');
const createActivityController = require('../controllers/createActivity')

const createActivity = async ( req , res ) => {
    const { id , nombre , difficulty , duration , season , countries } = req.body;
    // console.log(req.body) (muestra todo lo pasado por parametros)

    const newActivity = await createActivityController( id , nombre , difficulty , duration , season , countries );
    res.json(newActivity);

}

module.exports = createActivity;