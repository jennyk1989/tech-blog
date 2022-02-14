const path = require('path'); //import path package
const express = require('express'); //import express package
const exphbs = require('express-handlebars'); //import handlebars template engine
const sequelize = require('./config/connection'); //import connection to db
const session = require('express-session'); // import session package
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const helpers = require('./utils/helpers'); // import helpers

// create express server
const app = express(); //creates express server
const PORT = process.env.PORT || 3001;

// create session
const sess = {
    secret: "secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

// built-in Express methods
app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(require('./controllers'));

// create template engine (handlebars)
const hbs = exphbs.create({ helpers });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

sequelize.sync({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});