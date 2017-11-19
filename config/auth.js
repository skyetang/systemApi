const jwt = require('jwt-simple');
const User = require('../model/user');

const isAuth = (req, res, next) => {
  const token = (req.body && req.body.access_token)
    || (req.query && req.query.access_token)
    || req.headers['access_token'];
  if (token) {
    try {
      const tokenInfo = jwt.decode(token, 'skyeApiToken');
      User.findOne({ _id: tokenInfo.uid }, (err, usr) => {
        if(err) {
          res.send({ success: false, message: '无权限' });
        }
        req.user = usr;
        next();
      });
    } catch (err) {
      res.send({ success: false, message: '获取token出错，请重试' });
    }
  } else {
    res.send({ success: false, message: '无权限' });
  }
};

module.exports = isAuth;
