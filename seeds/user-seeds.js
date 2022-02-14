// seeds for adding some users
const { User } = require('../models'); //import User model

const userdata = [
    {
        username: 'JohnDoe',
        password: 'johnpass'
    },
    {
        username: 'MarySmith',
        password: 'marypass'
    },
    {
        username: 'JoeBlow',
        password: 'joepass'
    }
];
const seedUsers = () => User.bulkCreate(userdata, {individualHooks:true});
module.exports = seedUsers;