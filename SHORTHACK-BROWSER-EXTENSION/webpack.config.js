var webpack = require('webpack'),
  path = require('path'),
  fileSystem = require('fs-extra'),
  env = require('./utils/env'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  TerserPlugin = require('terser-webpack-plugin');
var { CleanWebpackPlugin } = require('clean-webpack-plugin');
var ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
var ReactRefreshTypeScript = require('react-refresh-typescript');
const dotenv = require('dotenv');

const ASSET_PATH = process.env.ASSET_PATH || '/';
const BUILD_ENVIRONMENT = process.env.BUILD_ENVIRONMENT || '';

// Load environment variables from .env file
const envPath = path.resolve(__dirname, '.env');
if (fileSystem.existsSync(envPath)) {
  const envConfig = dotenv.config({ path: envPath });
  if (envConfig.error) {
    console.warn('Warning: Could not load .env file:', envConfig.error.message);
  }
}

var alias = {};

// load the secrets
var secretsPath = path.join(__dirname, 'secrets.' + env.NODE_ENV + '.js');

var fileExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'eot',
  'otf',
  'svg',
  'ttf',
  'woff',
  'woff2',
];

if (fileSystem.existsSync(secretsPath)) {
  alias['secrets'] = secretsPath;
}

const isDevelopment = process.env.NODE_ENV !== 'production';

// In development mode (npm start), only build sidepanel
// In production mode (npm build), build all components
var entries = {
  sidepanel: path.join(__dirname, 'src', 'pages', 'Sidepanel', 'index.jsx'),
};

if (!isDevelopment) {
  entries.contentScript = path.join(
    __dirname,
    'src',
    'pages',
    'Content',
    'index.js'
  );
  entries.background = path.join(
    __dirname,
    'src',
    'pages',
    'Background',
    'index.js'
  );
}

var options = {
  mode: process.env.NODE_ENV || 'development',
  entry: entries,
  bail: !isDevelopment, // Fail on first error in production
  chromeExtensionBoilerplate: {
    notHotReload: ['background', 'contentScript'],
  },
  target: ['web', 'es5'], // Ensure compatibility with browser extensions
  output: {
    filename: '[name].bundle.js',
    path: BUILD_ENVIRONMENT
      ? path.resolve(__dirname, `build-${BUILD_ENVIRONMENT}`)
      : path.resolve(__dirname, 'build'),
    clean: true,
    publicPath: ASSET_PATH,
  },
  module: {
    rules: [
      {
        // look for .css files
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        // look for .scss files
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: new RegExp('.(' + fileExtensions.join('|') + ')$'),
        type: 'asset/resource',
        exclude: /node_modules/,
        // loader: 'file-loader',
        // options: {
        //   name: '[name].[ext]',
        // },
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              getCustomTransformers: () => ({
                before: [isDevelopment && ReactRefreshTypeScript()].filter(
                  Boolean
                ),
              }),
              transpileOnly: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'source-map-loader',
          },
          {
            loader: require.resolve('babel-loader'),
            options: {
              plugins: [
                isDevelopment && require.resolve('react-refresh/babel'),
              ].filter(Boolean),
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: alias,
    extensions: fileExtensions
      .map((extension) => '.' + extension)
      .concat(['.js', '.jsx', '.ts', '.tsx', '.css']),
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // In development mode, don't clean background.bundle.js and contentScript.bundle.js
    new CleanWebpackPlugin({
      verbose: false,
      cleanOnceBeforeBuildPatterns: isDevelopment
        ? [
            'sidepanel.bundle.js',
            'sidepanel.html',
            '*.css',
            '!background.bundle.js',
            '!contentScript.bundle.js',
          ]
        : ['**/*'],
    }),
    new webpack.ProgressPlugin(),
    // expose and write the allowed env vars on the compiled bundle
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
      REACT_APP_AZURE_BOT_DIRECT_LINE_SECRET:
        process.env.REACT_APP_AZURE_BOT_DIRECT_LINE_SECRET || '',
      REACT_APP_HTTP_API_ENDPOINT:
        process.env.REACT_APP_HTTP_API_ENDPOINT || '',
      // Microsoft Entra ID Authentication
      REACT_APP_ENTRA_CLIENT_ID: process.env.REACT_APP_ENTRA_CLIENT_ID || '',
      REACT_APP_ENTRA_TENANT_ID:
        process.env.REACT_APP_ENTRA_TENANT_ID || 'organizations',
      REACT_APP_API_SCOPE: process.env.REACT_APP_API_SCOPE || '',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/manifest.json',
          to: BUILD_ENVIRONMENT
            ? path.join(__dirname, `build-${BUILD_ENVIRONMENT}`)
            : path.join(__dirname, 'build'),
          force: true,
          transform: function (content, path) {
            // generates the manifest file using the package.json informations
            const manifest = JSON.parse(content.toString());
            const originalName = manifest.name;
            const environmentName = BUILD_ENVIRONMENT
              ? `${originalName} (${
                  BUILD_ENVIRONMENT.charAt(0).toUpperCase() +
                  BUILD_ENVIRONMENT.slice(1)
                })`
              : originalName;

            return Buffer.from(
              JSON.stringify(
                {
                  description: process.env.npm_package_description,
                  version: process.env.npm_package_version,
                  ...manifest,
                  name: environmentName,
                },
                null,
                2
              )
            );
          },
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-128.png',
          to: BUILD_ENVIRONMENT
            ? path.join(__dirname, `build-${BUILD_ENVIRONMENT}`)
            : path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'src/assets/img/icon-34.png',
          to: BUILD_ENVIRONMENT
            ? path.join(__dirname, `build-${BUILD_ENVIRONMENT}`)
            : path.join(__dirname, 'build'),
          force: true,
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'pages', 'Sidepanel', 'index.html'),
      filename: 'sidepanel.html',
      chunks: ['sidepanel'],
      cache: false,
    }),
  ].filter(Boolean),
  infrastructureLogging: {
    level: 'info',
  },
};

if (env.NODE_ENV === 'development') {
  options.devtool = 'cheap-module-source-map';
} else {
  options.optimization = {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  };
}

module.exports = options;
