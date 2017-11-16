const express = require('express');
const Router = express.Router();
const passport = require('passport');
const User = require('../model/user');

Router.post('/singin', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'validate success' });
});

Router.post('/register', (req, res) => {
    let pwd = req.body.password;
    /* bcrypt.hash(pwd, 10, (err, hash) => {
        if(err) return err;
        pwd = hash;
    }); */
    const user = new User({
        username: req.body.username,
        password: pwd
    });
    user.save((err, user) => {
        if(err) {
            res.send({ 'err': err, 'success': false })
        } else {
            res.send({ 'err': err, 'success': true })
        }
    });
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