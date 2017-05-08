// (c) Andrew Wei

'use strict';

import path from 'path';
import webpack from 'webpack';

const debug = (process.env.NODE_ENV === 'development');
const enableSourcemaps = (process.env.ENABLE_SOURCEMAPS === 'true');

console.log(`Webpack is using ${debug ? 'debug' : 'production'} configurations...`);

export default {
  cache: debug,
  context: path.join(__dirname, 'src'),
  devtool: enableSourcemaps ? 'eval-source-map' : false,
  entry: {
    requiem: './requiem.js'
  },
  output: {
    path: path.join(__dirname, 'lib'),
    filename: debug ? '[name].js' : '[name].min.js',
    library: 'requiem',
    libraryTarget: 'umd',
    sourceMapFilename: debug ? '[name].map' : '[name].min.map'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }]
  },
  plugins: debug ? [
    new webpack.LoaderOptionsPlugin({ 
      debug: true 
    })
  ] : [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ]
};
