const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/assets/index.html',
  filename: 'index.html',
  inject: 'body',
});

module.exports = {
  devtool: 'source-map',
  entry: [
    'babel-polyfill',
    'webpack-hot-middleware/client?path=http://localhost:5000/__webpack_hmr?reload=true',
    path.join(__dirname, '/client/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  externals: {
    jquery: 'jQuery'
  },
  module: {
    rules: [
      { test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: [/node_modules/, /server/, /template/],
      },
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
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
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    HtmlWebpackPluginConfig,
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: false
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new CopyWebpackPlugin([
      {
        from: 'client/assets/manifest.json',
        to: './manifest.json'
      },
      {
        from: 'client/assets/favicon.ico',
        to: './favicon.ico'
      },
      {
        from: 'client/assets/uploads',
        to: './uploads'
      },
    ])
  ],
  devServer: {
    hot: true,
    inline: true,
    contentBase: './build',
    historyApiFallback: true,
    proxy: {
      '/api/v1': 'http://localhost:5000'
    },
    stats: 'errors-only',
  },
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
};
