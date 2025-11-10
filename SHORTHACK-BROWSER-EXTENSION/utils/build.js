// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';
process.env.ASSET_PATH = '/';

var webpack = require('webpack'),
  config = require('../webpack.config');

delete config.chromeExtensionBoilerplate;

config.mode = 'production';

webpack(config, function (err, stats) {
  if (err) {
    console.error('❌ Fatal webpack error:', err);
    process.exit(1);
  }

  if (stats.hasErrors()) {
    console.error('\n❌ Build failed with errors:\n');
    const info = stats.toJson({ errors: true });
    info.errors.forEach((error) => {
      console.error(error.message || error);
    });
    process.exit(1);
  }

  if (stats.hasWarnings()) {
    console.warn('\n⚠️  Build warnings:\n');
    const info = stats.toJson({ warnings: true });
    info.warnings.forEach((warning) => {
      console.warn(warning.message || warning);
    });
  }

  console.log('\n✅ Build completed successfully\n');
  console.log(
    stats.toString({
      colors: true,
      chunks: false,
      modules: false,
      children: false,
      assets: true,
      timings: true,
    })
  );
});
