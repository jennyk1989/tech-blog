const path = require('path'); //import path module
const express = require('express'); //import express module
const exphbs = require('express-handlebars'); //import handlebars template engine
const sequelize = require('./config/connection'); 

const app = express();
const PORT = process.env.PORT || 3006;

//adding template engine
const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//take contents of public folder and make it into static assets
app.use(express.static(path.join(__dirname, 'public'))); 

sequelize.syn({ force: false}).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});