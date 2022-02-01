const path = require('path'); //import path module
const express = require('express'); //import express module
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3006;

//take contents of public folder and make it into static assets
app.use(express.static(path.join(__dirname, 'public'))); 