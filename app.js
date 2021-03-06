const koa = require('koa');
const passport = require('koa-passport');
const mongoose = require('mongoose');
const bodyParser = require('koa-bodyparser');
const login = require('./routes/login');

require('./controller/passport')(passport);

const app = new koa();

const db = mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true });
mongoose.Promise = global.Promise;


app.use(bodyParser());
app.use(passport.initialize());
app.use(async (ctx, next) => {
  console.log(`请求了地址：=> ${ctx.request.origin}${ctx.request.url}`);
  await next();
});
app.use(login.routes());

const port = process.env.PORT || 8387;
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

