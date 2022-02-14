//auth. a user is loggin in
const withAuth = (req, res, next) => {
    if(!req.session.user_id) {
        res.redirect('/login'); //redirect user to login if no session
    } else {
        next(); //calls next middleware fx
    }
};

module.exports = withAuth;