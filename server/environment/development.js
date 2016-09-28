const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../../webpack/webpack.development.js');
const Dashboard = require('webpack-dashboard');
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = (app) => {
  const compiler = webpack(webpackConfig);
  const dashboard = new Dashboard();

  compiler.apply(new DashboardPlugin(dashboard.setData));

  const middleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler, {
    log: () => {},
  }));

  // to enable html5 history api, we respond to 404s with index.html
  const fs = middleware.fileSystem;
  app.get('*', (req, res) => {
    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(file.toString());
      }
    });
  });

  return middleware;
};
