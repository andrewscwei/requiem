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

const sourceDir = path.join(__dirname, 'app');
const buildDir = path.join(__dirname, 'public');

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval',
  context: path.join(sourceDir, 'scripts'),
  entry: {
    main: [
      './main.js'
    ]
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
      test: /\.(htm?l|jade)$/,
      loader: 'template-html',
      query: {
        basedir: path.join(sourceDir, 'templates'),
        template: true
      }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.sass', '.jade', '.html'],
    root: [
      path.join(sourceDir, 'scripts'),
      path.join(sourceDir),
      path.join(__dirname, '../', 'dist')
    ],
    modulesDirectories: [
      path.join(__dirname, '../', 'node_modules')
    ]
  }
}
