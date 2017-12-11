const Router = require('koa-router');
const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const User = require('../model/user');
const checkToken = require('../controller/checkToken');
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

router.post('/check', checkToken, async (ctx) => {
  ctx.body = { success: true };
});

router.post('/register', );


module.exports = router;
