//index file for the seeds
//import seeds created
const seedUsers = require('./user-seeds');
const seedPosts = require ('./post-seeds');
const seedComments = require ('./comment-seeds');

//connnect to sequelize 
const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('--------------');
    await seedUsers();
    console.log('--------------');

    await seedPosts();
    console.log('--------------');

    await seedComments();
    console.log('--------------');

    process.exit(0) //exit on success
};

seedAll();