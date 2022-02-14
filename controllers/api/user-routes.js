//create router as an Express module
const router = require('express').Router();
//import models
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

// route to get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] } //don't want api giving out passwords
    })
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// route to get a single user (by id)
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] }, //don't want api giving out passwords
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post, 
                // post table's columns + created_at from helper
                attributes: ['id', 'title', 'post_text', 'created_at']
            },
            //want to include comments when displaying a single post
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No user found by this id'});
            return;
        }
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// route to add a user (sign up)
router.post('/', (req, res) => {
    User.create({ //sequelize create method
        username: req.body.username,
        password: req.body.password
    })
    .then(data => {
        //make sure session is initiated beofre sending response back
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true; 
            res.json(data); //sends response back
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// route for user to login (verify login)
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(data => {
        if(!data) {
            res.status(400).json({ message: 'No user with that username'});
            return;
        };
        //password validation
        const validPassword = data.checkPassword(req.body.password);
        // if not a valid password:
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid password'});
            return;
        };
        //create the user session
        req.session.save(() => {
            req.session.user_id = data.id;
            req.session.username = data.username;
            req.session.loggedIn = true;
            //response:
            res.json ({ user: data, message: 'Now logged in!'});
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// route for user to logout 
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) { //check for a session & if exists destroy it
        req.session.destroy(() => {
            res.status(204).end();//send 204 status code if session successfully destroyed
        })
    } else {
        res.status(404).end(); 
    }
});
// route to update a user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, { //passing in req.body to only update what passes thru
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(data => {
        if(!data) {
            res.status(404).json({ message: 'No user found'});
            return;
        };
        res.json(data);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});
// route to delete a user 
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
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