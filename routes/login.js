const express = require('express');
const Router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../model/user');

/*
* 如果不需要passport自动通过session保存登录状态及设置cookie，则在验证时通过session:false
* 如果需要用到，则需要引入cook-parser,express-session, 并且user passport.session
* 设置serializeUser,deserializeUser方法等
* */
Router.post('/singin', passport.authenticate('local', { session: false }), (req, res) => {
  res.send(req.user);
});

Router.post('/check', (req, res) => {
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
