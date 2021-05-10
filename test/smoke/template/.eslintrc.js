module.exports = {
  parser: 'babel-eslint',
  // "extends": "airbnb", // 继承airbnb这个配置，如果是继承多个，可以写成一个数组
  env: { // 当前想启用的一个环境，比如browser或者node会知道它们中的一些全局变量，不会直接用时报错
    browser: true,
    node: true,
  },
  rules: { // 自定义扩展
    // "semi": "error"
  },
};
