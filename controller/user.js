const user = require('../model/user');

const findUser = ( username ) => {
  return new Promise((resolve, reject) => {
    user.findOne({ username }, (err, usr) => {
      if (!err) {
        reject(err);
      }
      resolve(usr);
    });
  });
};

const register =  async (ctx) => {
  const req = ctx.request.body;
  const res = bcrypt.hashSync(req.password, 10);
  const user = new User({
    username: req.username,
    password: res
  });
  const users = await findUser(req.username);
  if (users) {
    ctx.body = { success: false, message: '用户名已存在' };
  } else {
    await new Promise((resolve, reject) => {
      user.save((error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
    ctx.body = { success: true, message: '注册成功' };
  }
};

module.exports = {
  register
};
