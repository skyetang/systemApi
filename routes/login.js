const express = require('express');

const Router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../model/user');

const isAuthenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send({ success: false, message: '您的登录已失效或未登录，请登录后再试' });
};

Router.post('/singin', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

Router.post('/check', isAuthenticate, (req, res) => {
  res.send({ success: true, message: '检测成功' });
});

Router.post('/register', (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    if (err) return err;
    const user = new User({
      username: req.body.username,
      password: hash
    });
    user.save((error, usr) => {
      if (error) {
        res.send({ error, success: false });
      } else {
        res.send({ error, success: true, data: usr.username });
      }
    });
  });
});

Router.post('/test2', (req, res) => {
  passport.authenticate('local', {
    session: false,
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res);
});

module.exports = Router;
