/* flow */
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

module.exports = [
  {
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, './src/client'),
    entry: {
      app: './index.js',
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    node: {
      console: true,
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [{
            loader: 'babel-loader',
            options: {
              presets: [['es2015', { "modules": false }], 'stage-0', 'react'],
              plugins: ['transform-decorators-legacy']
            }
          }],
        }
      ],
    }
  },
  {
    entry: path.resolve(__dirname, './src/common/style/index.scss'),
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "index.css"
    },
    resolve: {
      modules: ["node_modules"]
    },
    module: {
      loaders: [
        {
          test: /\.scss$/, // files ending with .scss
          use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          })),
        },
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin('index.css', {
        allChunks: true,
      }),
    ]
  }
];
