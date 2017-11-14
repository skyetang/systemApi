const express = require('express');
const passport = require('./login');
const login = require('./routes/login');

const app = express();
app.use(passport.initialize());

app.use('/login', login);


app.get('/test', (req, res) => {
  res.send({'test': 'success'});
});

app.listen('8858');