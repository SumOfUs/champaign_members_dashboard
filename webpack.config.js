if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

module.exports = require(`./webpack/webpack.${process.env.NODE_ENV}`);
