const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
  target: 'electron-main',
  externals: {
    fs: 'commonjs fs',
    path: 'commonjs path',
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/preload-direct.js'),
          to: path.resolve(__dirname, '.webpack/main/preload-direct.js'),
        },
      ],
    }),
  ],
};
