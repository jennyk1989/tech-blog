// seeds for adding some users
const { User } = require('../models'); //import User model

const userSeeds = () => User.bulkcreate([
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
]);

module.exports = userSeeds;