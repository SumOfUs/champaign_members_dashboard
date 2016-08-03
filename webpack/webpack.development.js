const path = require('path');
const validator = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
const NoErrorsPlugin = require('webpack/lib/NoErrorsPlugin');

const ENV = process.env.NODE_ENV || 'development';
const DEBUG = process.env.DEBUG || true;

module.exports = validator({
  externals: {},

  entry: [
    'webpack-dev-server/client?http://localhost:8080/',
    path.resolve(process.cwd(), 'src', 'app.js'),
  ],

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    filename: '[name].[hash:8].bundle.js',
    sourceMapFilename: '[name].[hash:8].bundle.map',
    chunkFilename: '[id].[hash:8].chunk.js',
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
        'babel?presets=react-hmre',
      ],
      exclude: /node_modules/,
    }, {
      // Transform our own .css files with PostCSS and CSS-modules
      test: /\.css$/,
      exclude: /node_modules/,
      loaders: [
        'style-loader',
        'css-loader?localIdentName=[name]_[hash:base64:8]&modules&importLoaders=1&sourceMap',
        'postcss-loader',
      ],
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
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
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}',
      ],
    }],
  },

  plugins: [
    new HotModuleReplacementPlugin(),
    new NoErrorsPlugin(),
    new WebpackMd5Hash(),
    new OccurrenceOrderPlugin(true),
    new DefinePlugin({
      HMR: false,
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
    modulesDirectories: [
      'src',
      'node_modules',
    ],
  },

  devServer: {
    historyApiFallback: {
      index: '/',
    },
  },
  debug: DEBUG,
  cache: true,
  profile: true,
  target: 'web',
  devtool: 'cheap-module-eval-source-map',
  stats: false,
  progress: true,
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
  },
});
