//create router as an Express module
const router = require('express').Router();
// import models
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

// get the user's posts for the dashboard (user logged in)
router.get('/', withAuth, (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
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
        // creates "posts" array which contains serialized post object
        const posts = data.map(post => post.get({ plain: true }));
        // render the dashboard.hbs template
        res.render('dashboard', { 
            posts, //pass this "posts" object into dashboard.hbs template
            //conditionally render login/logout links based on the user's session:
            loggedIn: true 
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// route for rendering page where user can edit post
router.get('/edit/:id', withAuth, (req, res) => {
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
        res.render('edit-posts', {
            post,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// route for page where user adds a new post
router.get('/newpost', (req, res) => {
    res.render('new-posts');
});
// export router module to be loaded by controllers/index.js
module.exports = router;