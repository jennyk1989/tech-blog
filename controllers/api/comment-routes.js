//create router as an Express module
const router = require('express').Router();
// import Comment model
const { Comment } = require('../../models');
// import in auth.js
const withAuth = require('../../utils/auth');

// route to get all comments

// route to create new comments 

// route to delete comments

// export router module to be loaded by api/index.js
module.exports = router;