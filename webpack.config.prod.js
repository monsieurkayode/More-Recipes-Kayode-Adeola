const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './client/assets/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true
  }
});

const UglifyJsWebpackPluginConfig = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    screw_ie8: true,
    conditionals: true,
    unused: true,
    comparisons: true,
    sequences: true,
    dead_code: true,
    evaluate: true,
    if_return: true,
    join_vars: true
  },
  output: {
    comments: false
  }
});

const HashedModuleIdsPluginConfig = new webpack.HashedModuleIdsPlugin({
  hashFunction: 'sha256',
  hashDigest: 'hex',
  hashDigestLength: 20
});

module.exports = {
  devtool: 'source-map',
  entry: [
    path.join(__dirname, '/client/src/index.jsx')
  ],
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'js/bundle.js',
    publicPath: '/'
  },
  externals: {
    jquery: 'jQuery',
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
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
    HtmlWebpackPluginConfig,
    UglifyJsWebpackPluginConfig,
    HashedModuleIdsPluginConfig,
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new ExtractTextPlugin({
      filename: 'css/style.css',
      allChunks: true
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.HashedModuleIdsPlugin({
      hashFunction: 'sha256',
      hashDigest: 'hex',
      hashDigestLength: 20
    }),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
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
  node: {
    net: 'empty',
    dns: 'empty',
    fs: 'empty',
  },
};
