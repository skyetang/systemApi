const Router = require('koa-router');
const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const User = require('../model/user');
const isAuth = require('../config/auth');
const router = new Router();
/*
* 如果不需要passport自动通过session保存登录状态及设置cookie，则在验证时通过session:false
* 如果需要用到，则需要引入cook-parser,express-session, 并且user passport.session
* 设置serializeUser,deserializeUser方法等
* */
router.post('/singin', (ctx) => {
  return passport.authenticate('local', { session: false }, (err, info) => {
    if (err) {
      ctx.body = err;
    } else {
      ctx.body = info;
    }
  })(ctx);
});

router.post('/check', isAuth, (ctx) => {
  ctx.body = { success: '123' };
});

router.post('/register', (req, res) => {
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

router.post('/test2', (req, res) => {
  passport.authenticate('local', {
    session: false,
    successRedirect: '/',
    failureRedirect: '/login'
  })(req, res);
});

module.exports = router;
