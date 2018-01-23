const path = require('path');
const webpack = require('webpack');
const $ = require('jquery');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, '/client/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/client/build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: 'url-loader?limit=250000'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};
