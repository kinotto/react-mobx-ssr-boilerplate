/* flow */
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

module.exports = (env = {}) => {
  const baseConfig = {
    //external source maps in prod to reduce bundle size but still allow debugging!
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: './src/client/index.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.scss$/,
          use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader'],
          }))
        }
      ]
    },
    plugins: [
      new ExtractTextWebpackPlugin({
        allChunks: true,
        filename: "index.css"
      }),
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    }
  }

  if (!isProduction) {
    baseConfig.devServer = {
      inline: true,
      compress: true,
      port: env.PORT,
      hot: true,
      proxy: {
        //forward all routes to local express server and still keep hot-module-replacement from webpack
        "/**": {
          target: `http://localhost:${env.TO}`
        }
      }
    }
    baseConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  return baseConfig;
};
