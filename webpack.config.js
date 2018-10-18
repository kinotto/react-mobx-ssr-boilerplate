/* flow */
const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";

let baseConfig = [
  {
    //external source maps in prod to reduce bundle size but still allow debugging!
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    context: path.resolve(__dirname, './src/client'),
    entry: {
      app: './index.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'bundle.js',
      publicPath: '/'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader'
        }
      ],
    }
  }
];


const cssHotLoader = {
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


const definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify('production')
  }
});


if(isProduction) {
  baseConfig[0].plugins = [definePlugin];
} else {
  baseConfig.push(cssHotLoader);
}

module.exports = baseConfig;