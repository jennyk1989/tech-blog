//create router as an Express module
const router = require('express').Router();
//import models
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to get all users

// route to get a single user

// route to add a user (sign up)

// route for user to login (verify login)

// route for user to logout 

// route to update a user

// route to delete a user 

// export router module to be loaded by api/index.js
module.exports = router;