const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../model/user');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.message);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, usr) => {
    done(err, usr);
  });
});

module.exports = (passports) => {
  passports.use(new Strategy((username, password, done) => {
    User.findOne({ username: username.toString() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, { success: false, message: '用户不存在', user: user});
      }
      bcrypt.compare(password, user.password, (error, usr) => {
        if (usr) {
          return done(null, { success: true, message: '登录成功', user: user});
        }
        return done(null, { success: false, message: '密码错误', user: user});
      });
    });
  }));
};
