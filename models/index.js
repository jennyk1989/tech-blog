// import created Models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user can post many posts
User.hasMany(Post, {
    foreignKey: 'user_id'
});

// user can make many comments
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

// posts can only be authored by one user
Post.belongsTo(User, { 
    foreignKey: 'user_id'
});

// posts can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// comments can only be authored by one user
Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// a comment can only apply to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

//export models now that associations have been made
module.exports = { User, Post, Comment };