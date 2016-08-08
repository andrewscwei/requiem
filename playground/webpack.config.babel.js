// (c) Andrew Wei

'use strict';

import path from 'path';
import webpack from 'webpack';

const sourceDir = path.join(__dirname, 'app');
const buildDir = path.join(__dirname, 'public');

export default {
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  context: path.join(sourceDir, 'scripts'),
  entry: {
    main: './main.js'
  },
  output: {
    path: path.join(buildDir, 'javascripts'),
    publicPath: '/javascripts/',
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    sourceMapFilename: '[name].map'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: [
        'babel'
      ],
      exclude: /node_modules/
    }, {
      test: /\.[s]?css$/,
      loaders: [
        'style',
        'css',
        `sass?includePaths=${path.join(sourceDir, 'scripts', 'stylesheets')},outputStyle=expanded,sourceMap`
      ]
    }, {
      test: /\.pug$/,
      loader: `pug?root=${path.join(sourceDir, 'templates')}`
    }]
  },
  resolve: {
    extensions: ['', '.js', '.scss', '.pug'],
    root: [
      path.join(sourceDir, 'scripts'),
      path.join(sourceDir),
      path.join(__dirname, '../', 'src')
    ],
    modulesDirectories: [
      path.join(__dirname, '../', 'node_modules')
    ]
  }
}
