const jwt = require('jwt-simple');
const User = require('../model/user');

const isAuth = (ctx, next) => {
  const token = (ctx.body && ctx.body.access_token)
    || (ctx.query && ctx.query.access_token)
    || ctx.headers['access_token'];
  if (token) {
    try {
      const tokenInfo = jwt.decode(token, 'skyeApiToken');
      User.findOne({ _id: tokenInfo.uid }, (err, usr) => {
        if(err) {
          ctx.body = { success: false, message: '无权限' };
        }
        ctx.body = { success: true, user: usr };
      });
      return next();
    } catch (err) {
      ctx.body = { success: false, message: '获取token出错，请重试' };
    }
  } else {
    ctx.body = { success: false, message: '无权限' };
  }
};

module.exports = isAuth;
