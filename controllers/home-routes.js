//this file will contain all of the user-facing routes such as the homepage & login
// import models
const { User, Post, Comment } = require('../models');
//create router as an Express module
const router = require('express').Router();
//connect to sequelize
const sequelize = require('../config/connection');

// route for rendering all posts to the homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [ //Post table columns + created_at (from post-info.hbs)
            'id',
            'title',
            'post-text',
            'created_at'
        ],
        include: [ //also wants to include Comments on the post and author of the post
            {
                model: Comment,
                // columns of the Comment table + created_at from post-info.hbs
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { //include the username of the user that posted the comment
                    model: User,
                    attributes: ['username']
                } 
            },
            { //include author of the post
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        // creates "posts" array which contains serialized post object
        const posts = data.map(post => post.get({ plain: true }));
        // render the homepage.hbs template
        res.render('homepage', { 
            posts, //pass this "posts" object into homepage.hbs template
            //conditionally render login/logout links based on the user's session:
            loggedIn: req.session.loggedIn 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// route to get a single post (used when user clicks on a post)
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
           id: req.params.id 
        },
        attributes: [ //Post table columns + created_at (from post-info.hbs)
            'id',
            'title',
            'post-text',
            'created_at'
        ],
        include: [ //also wants to include Comments on the post and author of the post
            {
                model: Comment,
                // columns of the Comment table + created_at from post-info.hbs
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: { //include the username of the user that posted the comment
                    model: User,
                    attributes: ['username']
                } 
            },
            { //include author of the post
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }

        //? serialize the data
        const post = data.get({ plain: true});
        //? pass data to template using post object
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// route to check if user logged in 
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/'); //redirecting user to home page after user logs in
        return;
    };
    res.render('login'); //render the login template
});

// export router module to be loaded by controllers/index.js
module.exports = router;