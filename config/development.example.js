// For each environment, you need a file named `config/${environment}.js` that
// will be loaded whenever the app imports the 'app-config' module.
// Webpack has been configured to alias 'app-config' => 'config/{ENV}.js'
export default {
  apiUrl: process.env.API_URL || 'http://localhost:3000',
  debug: true,
};
