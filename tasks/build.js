/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');
var $util = require('gulp-util');
var webpack = require('webpack');

/**
 * Cleans the built files.
 */
gulp.task('clean', function(done) {
  del(config.tasks.build.clean.input).then(function(paths) {
    done();
  });
});

/**
 * Builds the JavaScript library.
 */
gulp.task('build', function(done) {
  var guard = false;

  if (config.env.watch) {
    webpack(config.tasks.build.webpack.pretty).watch(100, build(done));
  }
  else {
    webpack(config.tasks.build.webpack.pretty).run(build(function() {
      webpack(config.tasks.build.webpack.ugly).run(build(done));
    }));
  }

  function build(cb) {
    return function(err, stats) {
      if (err) throw new $util.PluginError('webpack', err);
      $util.log($util.colors.green('[webpack]'), stats.toString());

      if (!config.env.watch) {
        cb();
      }
      else if (!guard) {
        guard = true;
        cb();
      }
    };
  }
});
