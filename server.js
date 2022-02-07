const path = require('path'); //import path module
const express = require('express'); //import express module
const exphbs = require('express-handlebars'); //import handlebars template engine

 
// create express server
const app = express(); //creates express server
const PORT = process.env.PORT || 3006;

// Sequelize & sessions
const sequelize = require('./config/connection'); 
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// add helpers
const helpers = require('./utils/helper');

// create template engine (handlebars)
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// built-in Express methods
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(require('./controllers'));

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});