const cssnano = require('cssnano');
const { merge } = require('webpack-merge');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');
const baseConfig = require('./webpack.base');

const ssrConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
      {
        test: /\.less$/,
        use: 'ignore-loader',
      },
    ],
  },
  plugins: [
    new OptimizeCssAssetsWebpackPlugin({
      assetNameRegExp: /\.less$/g,
      cssProcessor: cssnano,
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: 'react',
        entry: 'https://now8.gtimg.com/now/lib/16.2.0/react.min.js',
        global: 'React',
      },
      {
        module: 'react-dom',
        entry: 'https://now8.gtimg.com/now/lib/16.2.0/react-dom.min.js',
        global: 'ReactDOM',
      },
      ],
      // hash: true,
      files: ['search.html'],
    }),
  ],
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        // 提取公共文件
        commons: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          priority: -20,
        },
        // 提取公共脚本
        vendors: {
          test: /(react|react-dom)/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
        },
      },
    },
  },
};

module.exports = merge(baseConfig, ssrConfig);
