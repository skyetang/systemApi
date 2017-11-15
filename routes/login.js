const express = require('express');
const Router = express.Router();
const passport = require('passport');

Router.get('/test', (req, res) => {
    res.send({
        message: 'success'
    })
});

Router.post('/test', passport.authenticate('local', { session: false }), (req, res) => {
    console.log(req.user);
    res.send({ message: 'validate success' });
});

Router.post('/test2', (req, res) => {
        passport.authenticate('local', {
            session: false,
            successRedirect: '/',
            failureRedirect: '/login',
        })(req, res)
    }
);


module.exports = Router;