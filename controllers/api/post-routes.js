//create router as an Express module
const router = require('express').Router();
// import models
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const sequelize = require('../../config/connection');

//route to get all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [ //Post table columns + created_at (from post-info.hbs)
            'id',
            'title',
            'post-text',
            'created_at'
        ],
        //want posts to show in order (recent posts on bottom)
        order: [['created_at', 'DESC']],
        include: [
            //show the comments
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// route to get one post 
router.get('/:id', (req, res) => {
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
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// route to add a post
router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_text: req.body.post_text,
        user_id: req.session.user_id
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// route to update a post
router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            post_text: req.body.post_text,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No post found with this id'});
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})
// route to delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        };
        res.json(data); 
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// export router module to be loaded by api/index.js
module.exports = router;