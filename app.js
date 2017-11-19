const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const login = require('./routes/login');

require('./config/passport')(passport);

const app = express();

const db = mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

app.use(session({
  secret: 'skye tang',
  saveUninitialized: false,
  resave: false,
  cookie: { maxAge: 180 * 60 * 1000 } // store保存时间
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use('/login', login);

const port = process.env.PORT || 8858;
console.log(`> Starting dev server on port: ${port}`);

app.listen(port, () => {
  console.log('——服务启动成功！——');
});

db.on('error', (error) => {
  console.log(`数据库连接失败：${error}`);
});

db.on('open', () => {
  console.log('——数据库连接成功！——');
});

