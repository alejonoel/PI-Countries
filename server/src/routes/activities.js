const express = require('express');
const getAllActivities = require('../handlers/aGetActivities');
const createActivity = require('../handlers/aCreateActivity');
const routerActivities = express.Router();

routerActivities.get('/', getAllActivities);
routerActivities.post('/', createActivity);

module.exports = routerActivities;