//create router as an Express module
const router = require('express').Router();
// import Comment model
const { Comment } = require('../../models');
// import in auth.js
const withAuth = require('../../utils/auth');

// route to get all comments
router.get('/', (req, res) => {
    Comment.findAll({})
    .then(data => res.json(data))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
// route to create new comments 
router.post('/', withAuth, (req, res) => {
    if(req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id //use user id from session
        })
        .then(data => res.json(data))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    };
});
// route to delete comments
router.delete('/:id', withAuth, (req, res) => {
    if(req.session) {
        Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(data => {
            if(!data) {
                res.status(404).json({ message: 'No comment found with this id'});
                return;
            };
            res.json(data); 
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        }); 
    };
});
// export router module to be loaded by api/index.js
module.exports = router;