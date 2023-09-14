const { Router } = require("express");

const routerCountries = require('./countries');
const routerActivities = require('./activities')

const router = Router();

router.use("/countries", routerCountries);
router.use("/activities", routerActivities);

module.exports = router;
