const passport = require('passport');
const { Strategy } = require('passport-local');
const User = require('../model/user');
const bcrypt = require('bcrypt');

passport.serializeUser((data, done) => {
  done(null, data.user.id);
});

passport.deserializeUser((id, done) => {
  User.findById({_id: id}, (err, usr) => {
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
        return done(null, false, { success: false, message: '用户不存在' });
      }
      bcrypt.compare(password, user.password, (error, validate) => {
        if (validate) {
          return done(null, { success: true, message: '登录成功', user: { username: user.username, id:user._id }});
        }
        return done(null, false, { success: false, message: '密码错误' });
      });
    });
  }));
};
