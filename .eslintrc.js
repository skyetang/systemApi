module.exports = {
  "extends": "airbnb-base",
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 关闭不能使用console.log打印
    "no-console": "off",
    //对象字面量项尾不能有逗号
    "comma-dangle": [2, "never"],
    //可以给参数重新赋值
    "no-param-reassign":0,
    //允许全局用require
    "global-require": 0,
    //关闭换行风格检测
    'linebreak-style': 0,
    // 强制方法必须返回值，TypeScript强类型，不配置
    "consistent-return": 0
  },
};