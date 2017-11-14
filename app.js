const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const login = require('./routes/login');

require('./config/passport')(passport);

const app = express();

mongoose.connect('mongodb://localhost:27017/test', { useMongoClient:true });

app.use(passport.initialize());
app.use('/login', login);

const port = process.env.PORT || 8858;

console.log(`> Starting dev server on port: ${port}`);

app.listen(port);

