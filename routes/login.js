const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', passport.authenticate('local'), (req, res ,next) => {
  console.log(req, res);
})

router.get('/test', (req, res) => {
  res.send({
    'loginTest': 'true'
  })
});

module.exports = router;