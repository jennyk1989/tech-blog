//create router as an Express module
const router = require('express').Router();

// import api routes: /comments /posts /users
const commentRoutes = require('./comment-routes'); //importing in comment routes
const postRoutes = require('./post-routes');
const userRoutes = require('./user-routes');

// tell Express to use the routes
router.use = ('/comments', commentRoutes);
router.use = ('/posts', postRoutes);
router.use = ('/users', userRoutes);

// export the router module
module.exports = router;
