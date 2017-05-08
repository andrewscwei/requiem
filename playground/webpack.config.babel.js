// (c) Andrew Wei

'use strict';

import path from 'path';
import webpack from 'webpack';

const sourceDir = path.join(__dirname, 'app');
const buildDir = path.join(__dirname, 'public');

export default {
  cache: true,
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
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader'
    }, {
      test: /\.[s]?css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }, {
        loader: 'sass-loader',
        options: {
          includePaths: [`${path.join(sourceDir, 'scripts', 'stylesheets')}`],
          outputStyle: 'expanded',
          sourceMap: true
        }
      }]
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }]
  },
  resolve: {
    extensions: ['.js', '.scss', '.pug'],
    modules: [
      path.join(sourceDir, 'scripts'),
      path.join(sourceDir),
      path.join(__dirname, '../', 'src'),
      path.join(__dirname, '../', 'node_modules')
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
  ]
};
