// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'development';
process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';

var WebpackDevServer = require('webpack-dev-server'),
  webpack = require('webpack'),
  config = require('../webpack.config'),
  env = require('./env'),
  path = require('path');

var options = config.chromeExtensionBoilerplate || {};
var excludeEntriesToHotReload = options.notHotReload || [];

for (var entryName in config.entry) {
  if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
    config.entry[entryName] = [
      'webpack/hot/dev-server',
      `webpack-dev-server/client?hot=true&hostname=localhost&port=${env.PORT}`,
    ].concat(config.entry[entryName]);
  }
  console.log(
    `Entry "${entryName}": Hot reload ${
      excludeEntriesToHotReload.indexOf(entryName) === -1
        ? 'ENABLED'
        : 'DISABLED'
    }`
  );
}

delete config.chromeExtensionBoilerplate;

var compiler = webpack(config);

var server = new WebpackDevServer(
  {
    https: false,
    hot: true, // Enable hot reload for sidepanel
    liveReload: false,
    client: {
      webSocketTransport: 'sockjs',
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    webSocketServer: 'sockjs',
    host: '0.0.0.0', // Bind to all interfaces for devcontainer access
    port: env.PORT,
    static: {
      directory: path.join(__dirname, '../build'),
    },
    devMiddleware: {
      publicPath: `http://localhost:${env.PORT}/`,
      writeToDisk: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    allowedHosts: 'all',
    // Add watch options for devcontainer
    watchFiles: {
      paths: ['src/**/*'],
      options: {
        usePolling: true,
        interval: 1000,
      },
    },
  },
  compiler
);

(async () => {
  await server.start();
})();
