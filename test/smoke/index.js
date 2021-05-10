const path = require('path');
const webpack = require('webpack');
// eslint-disable-next-line import/no-extraneous-dependencies
const rimraf = require('rimraf');
// eslint-disable-next-line import/no-extraneous-dependencies
const Mocha = require('mocha');

const mocha = new Mocha({
  timeout: 10000,
});

// 进入到template目录
process.chdir(path.join(__dirname, 'template'));

// 每次运行之前先删除dist目录，可以借助rimraf这个库实现，删除成功进入回调函数
rimraf('./dist', () => {
  // eslint-disable-next-line global-require
  const prodConfig = require('../../lib/webpack.prod');
  webpack(prodConfig, (err, stats) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      // 抛出一个错误码，这样的话，如果报错就会以这个错误码退出
      process.exit(2);
    }

    // eslint-disable-next-line no-console
    console.log(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
    }));

    // eslint-disable-next-line no-console
    console.log('Webpack build success, begin run test.');
    mocha.addFile(path.join(__dirname, 'html-test.js'));
    mocha.addFile(path.join(__dirname, 'css-js-test.js'));

    mocha.run();
  });
});
