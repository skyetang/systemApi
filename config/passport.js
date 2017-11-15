const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const User = require('../model/user');

module.exports = function (passport) {
    passport.use(new Strategy((username, password, done) => {
        User.find({ 'username': username }, (err, user) => {
            if(err) {
                return done(err);
            }
            if(!user){
                return done(null, false, { message: 'Unknown User' });
            }
            return done(null, user);
        })
    }));
};