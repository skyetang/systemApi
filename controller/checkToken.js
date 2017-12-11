const jwt = require('jwt-simple');
const User = require('../model/user');

function getUser(token) {
  return new Promise((resolve, reject) => {
    User.findOne({ _id: token.uid }, (err, usr) => {
      if (err) {
        reject(err);
      }
      resolve(usr);
    });
  });
}

const checkToken = async (ctx, next) => {
  const token = (ctx.body && ctx.body.access_token)
    || (ctx.query && ctx.query.access_token)
    || ctx.headers['access_token'];
  if (token) {
    try {
      const tokenInfo = jwt.decode(token, 'skyeApiToken');
      const user = await getUser(tokenInfo);
      if (!user) {
        ctx.body = { success: false, message: '用户不存在' };
      } else {
        next();
      }
    } catch (err) {
      ctx.body = { success: false, message: '请重新登录' };
    }
  } else {
    ctx.body = { success: false, message: '请先登录' };
  }
};

module.exports = checkToken;
