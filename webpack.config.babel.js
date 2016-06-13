// (c) Andrew Wei

'use strict';

import path from 'path';
import webpack from 'webpack';

const debug = (process.env.NODE_ENV === 'development');
const enableSourcemaps = (process.env.ENABLE_SOURCEMAPS === 'true');
const sourceDir = path.join(__dirname, 'src');
const buildDir = path.join(__dirname, 'lib');
const plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin()
];

console.log(`Webpack is using ${debug ? 'debug' : 'production'} configurations...`);

export default {
  cache: debug,
  debug: debug,
  context: sourceDir,
  devtool: enableSourcemaps ? 'eval-source-map' : null,
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
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.json$/,
      loader: 'json',
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
