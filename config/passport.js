const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../model/user');
const bcrypt = require('bcrypt');
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

/*
 * 在strategy验证成功后，就会调用些方法创建session
 * 并接收传过来的参数，以id为值存在session当中
 * */
passport.serializeUser((data, done) => {
  done(null, data.user.id);
});

/*
 * 验证通过后的passport，在每次请求接口都会调用此方法
 * 并将查询到的用户信息，存放到回调访求req的user属性中
 * */
passport.deserializeUser((id, done) => {
  User.findById({ _id: id }, (err, usr) => {
    done(err, usr);
  });
});
