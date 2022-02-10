// import in dotenv
require('dotenv').config
// import in sequelize
const Sequelize = require('sequelize')

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_URL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
       host: 'localhost', 
       dialect: 'mysql', //language we want sequelize to work with
       port: 3306
    });

// export sequelize
module.exports = sequelize;