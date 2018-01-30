const path = require('path');
const webpack = require('webpack');
const $ = require('jquery');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?reload=true',
    // 'webpack-hot-middleware/client?path=http://localhost:5000/__webpack_hmr?reload=true',
    path.join(__dirname, '/client/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        use: ['react-hot-loader/webpack', 'babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader?name=fonts/[name].[ext]'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: 'file-loader?name=css/img/[name].[ext]',
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
    }),
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: './build',
    historyApiFallback: true,
    proxy: {
      '/api/v1': 'http://localhost:5000'
    },
  },
  node: {
    net: 'empty',
    dns: 'empty'
  },
};