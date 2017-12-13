const Router = require('koa-router');
const bcrypt = require('bcrypt');
const passport = require('koa-passport');
const checkToken = require('../controller/checkToken');
const router = new Router();
const rq =  require('request-promise');
const qs = require('qs');
const WXBizDataCrypt = require('../utils/WXBizDataCrypt');
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

router.get('/getOpenId', async (ctx) => {
  const appId = 'wx04e4f9fbe9fc05a0';
  const appSecret = '4e7d8d0524c48d3ca2154bc188a93c75';
  const code = ctx.query.code;
  const param = {
    appid: appId,
    secret: appSecret,
    js_code: code,
    grant_type: 'authorization_code'
  };
  const res = await rq({ method: 'POST', uri: 'https://api.weixin.qq.com/sns/jscode2session', form: param });
  ctx.body = res;
});

router.get('/decrypt', async(ctx) => {
  const appId = 'wx04e4f9fbe9fc05a0';
  const sessionKey = ctx.query.sessionKey;
  const iv = ctx.query.iv;
  const encryptData = ctx.query.encryptData;
  const pc = new WXBizDataCrypt(appId, sessionKey);
  const data = pc.decryptData(encryptData, iv);
  ctx.body = data;
});

router.post('/register', );


module.exports = router;
