/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import path from 'path';
import webpack from 'webpack';

const debug = (process.env.NODE_ENV === 'development');
const sourceDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'dist');
const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];

console.log(`Webpack is using ${debug ? 'debug' : 'production'} configurations...`);

module.exports = {
  cache: debug,
  debug: debug,
  context: sourceDir,
  entry: {
    requiem: './requiem.js'
  },
  output: {
    path: buildDir,
    filename: debug ? '[name].js' : '[name].min.js',
    library: 'requiem',
    libraryTarget: 'umd',
    sourceMapFilename: debug ? '[name].map' : '[name].min.map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        'babel'
      ],
      exclude: /node_modules/
    }]
  },
  plugins: debug ? plugins : plugins.concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
