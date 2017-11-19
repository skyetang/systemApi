const passport = require('passport');
const { Strategy } = require('passport-local');
const bcrypt = require('bcrypt');
const User = require('../model/user');

/*
 * 注册验证策略，以及验证的具体方法
 * */
module.exports = (passports) => {
  passports.use(new Strategy((username, password, done) => {
    User.findOne({ username: username.toString() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { success: false, message: '用户不存在' });
      }
      bcrypt.compare(password, user.password, (error, validate) => {
        if (validate) {
        /*
        * 将第二个字段的json数据，返回应用验证的接口req参数的user属性中
        * 同时参数会传给passport.serializeUser中去
        */
          return done(null, { success: true, message: '登录成功', user: { username: user.username, id:user._id }});
        }
        return done(null, false, { success: false, message: '密码错误' });
      });
    });
  }));
};