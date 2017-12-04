const koa = require('koa');
const Router = require('koa-router');
const passport = require('passport');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const login = require('./routes/login');

require('./config/passport')(passport);

const app = new koa();
const router = new Router();

const db = mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
mongoose.Promise = global.Promise;

router.use('/login', login.routes());

app.use(bodyParser());
app.use(passport.initialize());
app.use(router.routes());

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

