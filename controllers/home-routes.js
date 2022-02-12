//this file will contain all of the user-facing routes such as the homepage & login
// import models
const { User, Post, Comment } = require('../models');
//create router as an Express module
const router = require('express').Router();
//connect to sequelize
const sequelize = require('../config/connection');

// homepage rendering

// after login page

// signing up page

// see post up close page


// export router module to be loaded by controllers/index.js
module.exports = router;