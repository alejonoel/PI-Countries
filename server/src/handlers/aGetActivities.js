const { Activity } = require('../db');

const getAllActivities = async ( req , res) => {
    const allActivities = await Activity.findAll();
    res.json(allActivities)
}

module.exports = getAllActivities; 