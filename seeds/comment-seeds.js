//seeds for the comments
const { Comment } = require('../models');


const commentdata = [
    {
        comment_text: 'Great Post',
        user_id: 1,
        post_id: 1
    },
    {
        comment_text: 'Would like to see more of this',
        user_id: 2,
        post_id: 2
    },
    {
        comment_text: 'Very interesting',
        user_id: 3,
        post_id: 3
    },
];

const seedComments = () => Comment.bulkCreate(commentdata);
module.exports = seedComments;