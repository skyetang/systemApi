const express = require('express');
const Router = express.Router();
const passport = require('passport');

Router.get('/test', (req, res) => {
  res.send({
      message: 'success'
  })
});

Router.post('/test', passport.authenticate('local'), (req, res) => {
  res.send({
      message: 'su'
  })
});


module.exports = Router;