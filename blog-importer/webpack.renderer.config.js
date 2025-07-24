const rules = require('./webpack.rules');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

rules.unshift({
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
});

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

console.log('RENDERER LOADED');

module.exports = {
  module: {
    rules,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: process.env.NODE_ENV === 'development'
        ? path.resolve(__dirname, 'src/index.dev.html')
        : path.resolve(__dirname, 'src/index.html'),
    }),
  ],
  target: 'electron-renderer',
  externals: {
    'events': 'commonjs events',
    'fs': 'commonjs fs',
    'path': 'commonjs path',
    'crypto': 'commonjs crypto',
    'stream': 'commonjs stream',
    'buffer': 'commonjs buffer',
    'util': 'commonjs util',
    'assert': 'commonjs assert',
    'os': 'commonjs os',
    'url': 'commonjs url',
    'querystring': 'commonjs querystring',
    'zlib': 'commonjs zlib',
    'http': 'commonjs http',
    'https': 'commonjs https',
    'vm': 'commonjs vm',
    'tty': 'commonjs tty',
    'constants': 'commonjs constants',
  },
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false,
      stream: false,
      buffer: false,
      util: false,
      assert: false,
      os: false,
      url: false,
      querystring: false,
      zlib: false,
      http: false,
      https: false,
      vm: false,
      tty: false,
      constants: false,
      events: false,
    },
  },
  devServer: {
    port: 3002,
    hot: false,
    liveReload: false,
    client: {
      overlay: false,
      logging: 'none',
    },
  },
  devtool: 'cheap-module-source-map',
};