//create router as an Express module
const router = require('express').Router();
// import models
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// get the posts for the dashboard (user logged in)

// route for page for user to edit post

// route for page where user adds a new post

// export router module to be loaded by controllers/index.js
module.exports = router;