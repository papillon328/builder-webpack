// eslint-disable-next-line import/no-extraneous-dependencies
const glob = require('glob-all');
const path = require('path');
const {
  CleanWebpackPlugin,
} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const projectPath = process.cwd();

// 设置多页面打包
const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];

  const entryFiles = glob.sync(path.resolve(projectPath, './src/*/index.js'));

  Object.keys(entryFiles) // 通过Object.keys来获取这个数组
    // eslint-disable-next-line array-callback-return
    .map((index) => { // 拿到获取到的数组，进行处理
      const entryFile = entryFiles[index];
      // 利用正则匹配到pagename
      const match = entryFile.match(/src\/(.*)\/index\.js/);
      const pageName = match && match[1];

      entry[pageName] = entryFile;
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: path.join(projectPath, `src/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: [pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })// eslint-disable-line
      );
    });
  return {
    entry,
    htmlWebpackPlugins,
  };
};

const {
  entry,
  htmlWebpackPlugins,
} = setMPA();

module.exports = {
  entry,
  output: {
    filename: '[name].js', // 通过占位符确保文件名称的唯一
    path: path.join(projectPath, 'dist'),
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        'eslint-loader',
      ],
    },
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
      ],
    },
    {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader',
        {
          loader: 'postcss-loader',
        },
        {
          loader: 'px2rem-loader',
          options: {
            remUnit: 75,
            remPrecision: 8,
          },
        },
      ],
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'img/[name]_[hash:8].[ext]',
          limit: 5120,
        },
      }],
    },
    {
      test: /\.(woff|woff2|eot|ttf|TTF|otf)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: 'img/[name]_[hash:8].[ext]',
          limit: 5120,
        },
      }],
    },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css',
    }),
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    // function errorPlugin() {
    //   this.hooks.done.tap('done', (stats) => { // 如果是wepack3将hooks.done.tap改为plugin
    // eslint-disable-next-line max-len
    //     if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') === -1) {
    //       console.log('build error'); // eslint-disable-line
    //       process.exit(1);
    //     }
    //   });
    // },
  ].concat(htmlWebpackPlugins),
  stats: 'errors-only',
};
