const webpack = require('webpack');
const path = require('path');
const validator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ENV = 'production';
const DEBUG = false;

function isExternal(module) {
  const { userRequest } = module;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('/node_modules/') >= 0;
}

module.exports = validator({
  externals: {},

  entry: path.resolve(process.cwd(), 'src', 'app.js'),

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: 'http://localhost:8080/',
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: [
        'eslint',
      ],
      exclude: /node_modules/,
    }],
    loaders: [
      {
        test: /\.js$/,
        loaders: [
          'babel',
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]_[hash:base64:8]&modules&importLoaders=1&sourceMap',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        loaders: ['style-loader', 'css-loader'],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff',
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file',
      },
      {
        test: /\.(jpg|png|gif)$/,
        loaders: [
          'file-loader',
        ],
      },
    ],
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: module => isExternal(module),
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
      ENV: JSON.stringify(ENV),
      DEBUG,
    }),
    new webpack.optimize.UglifyJsPlugin({
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      comments: false,
      compress: {
        warnings: false,
        drop_console: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency',
    }),
  ],

  eslint: {
    emitWarning: true,
  },

  resolve: {
    extensions: [
      '',
      '.js',
    ],
    root: [
      path.resolve(process.cwd(), 'src'),
    ],
    alias: {
      'app-config$': path.resolve(process.cwd(), 'config', ENV),
    },
  },

  devtool: 'source-map',
  debug: false,
  cache: true,
  profile: true,
  target: 'web',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
  },
});
