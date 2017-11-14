const passport = require('passport');
const strategy = require('passport-local').Strategy;

passport.use(new strategy((username, password, done) => {
  console.log(username, password);
  done(null, 'admin');
}));

module.exports = passport;