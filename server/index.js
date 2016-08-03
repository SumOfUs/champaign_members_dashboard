const express = require('express');
const argv = require('minimist')(process.argv.slice(2));
const chalk = require('chalk');
const ip = require('ip');

const port = argv.port || process.env.PORT || 8080;
const env = argv.env || process.env.NODE_ENV || 'development';

const app = express();


// setup app for this environment (middleware, routes, etc).
console.log(`Configuring ${env} server...`);
const middleware = require(`./environment/${env}`)(app);

app.listen(port, (err) => {
  if (err) {
    return console.error(chalk.red(err.message));
  }

  console.log('Preparing bundle...');

  middleware.waitUntilValid(() => {
    const localUrl = chalk.magenta(`http://localhost:${port}`);
    const lanUrl = chalk.magenta(`http://${ip.address()}:${port}`)
    console.log()

    console.log(chalk.bold('Access URLs:'));
    console.log(`    localhost: ${localUrl}`);
    console.log(`          LAN: ${lanUrl}`);
  });
  return app;
});
