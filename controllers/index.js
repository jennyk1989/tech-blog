// create router as an Express module
const router = require('express').Router();

// controller routes: /api /dashboard /(homepage) 
const apiRoutes = require('./api'); //imports the routes define in api folder
const homeRoutes = require('./home-routes');
const dashboardRoutes = require('./dashboard-routes')

// tell express to use the routes
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/', homeRoutes);

// export the router module to the main app
module.exports = router;