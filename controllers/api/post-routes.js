//create router as an Express module
const router = require('express').Router();
// import models
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//route to get all posts

// route to get one post 

// route to add a post

// route to update a post

// route to delete a post


// export router module to be loaded by api/index.js
module.exports = router;