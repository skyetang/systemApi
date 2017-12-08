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

router.post('/check', isAuth, async (ctx) => {
  ctx.body = { success: true };
});

router.post('/register', async (ctx) => {
  const req = ctx.request.body;
  const res = bcrypt.hashSync(req.password, 10);
  const user = new User({
    username: req.username,
    password: res
  });
  try {
    let result;
    await user.save((error, usr) => {
      if (error) {
        result = { success: false };
      } else {
        result = { success: true, data: usr.username };
      }
    });
    ctx.body = { success: true };
  } catch (err) {
    ctx.body = { success: false, err };
  }
});


module.exports = router;
