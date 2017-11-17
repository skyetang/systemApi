const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../model/user');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log('s', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('d', user);
  done(null, user);
});

module.exports = (passports) => {
  passports.use(new Strategy((username, password, done) => {
    User.findOne({ username: username.toString() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, { success: false, message: '用户不存在' });
      }
      bcrypt.compare(password, user.password, (error, res) => {
        if (res) {
          return done(null, { success: true, message: '登录成功' });
        }
        return done(null, { success: false, message: '密码错误' });
      });
    });
  }));
};
