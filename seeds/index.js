//index file for the seeds
//import seeds created
const userSeeds = require('./user-seeds');
const postSeeds = require ('./post-seeds');
const commentSeeds = require ('./comment-seeds');

//connnect to sequelize 
const sequelize = require('../config/connection');

const allSeeds = async () => {
    await sequelize.sync({ force: true });
    await userSeeds();
    await postSeeds();
    await commentSeeds();
    process.exit(0) //exit on success
}

allSeeds();