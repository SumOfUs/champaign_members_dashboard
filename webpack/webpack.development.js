const path = require('path');
const validator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.DEBUG || true;

const vendor = [
  'react',
  'react-dom',
  'react-router',
  'redux',
  'immutable',
  'redux-immutable',
  'react-bootstrap',
  'react-router-redux',
  'react-router-bootstrap',
  'react-router-scroll',
  'redux-form',
  'reselect',
];

module.exports = validator({
  externals: {},

  entry: {
    vendor: [
      ...vendor,
      'webpack-hot-middleware/client',
    ],
    app: [
      'react-hot-loader/patch',
      path.resolve(process.cwd(), 'src', 'app.js'),
      'webpack-hot-middleware/client',
    ],
  },

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },

  module: {
    preLoaders: [{
      test: /\.js$/,
      loaders: [
        'eslint',
      ],
      exclude: /node_modules/,
    }],
    loaders: [{
      test: /\.js$/,
      loaders: [
        'babel',
      ],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader?localIdentName=[name]_[hash:base64:8]&modules&importLoaders=1&sourceMap',
        'postcss-loader',
      ],
    }, {
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.(jpg|png|gif)$/,
      loaders: [
        'file-loader',
      ],
    }],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    new OccurrenceOrderPlugin(true),
    new CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env),
      ENV: JSON.stringify(ENV),
      DEBUG,
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

  debug: DEBUG,
  cache: true,
  profile: true,
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
  },
});
