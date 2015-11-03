/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * Playground tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var autoprefixer = require('autoprefixer');
var browserSync = require('browser-sync');
var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');
var path = require('path');
var sequence = require('run-sequence');
var webpack = require('webpack');
var $jade = require('gulp-jade');
var $postcss = require('gulp-postcss');
var $sass = require('gulp-sass');
var $util = require('gulp-util');

/**
 * Cleans built files in the playground.
 */
gulp.task('clean:play', function(done) {
  del(config.tasks.play.clean.input).then(function(paths) {
    done();
  });
});

/**
 * Compiles stylesheets for the playground.
 */
gulp.task('styles:play', function() {
  return gulp.src(config.tasks.play.styles.input)
    .pipe($sass(config.tasks.play.styles.sass)
    .on('error', function(err) {
      $util.log($util.colors.red('[sass] ' + err.message));
      this.emit('end');
    }))
    .pipe($postcss([autoprefixer()]))
    .pipe(gulp.dest(config.tasks.play.styles.output));
});

/**
 * Compiles JavaScripts for the playground, option to watch for
 * changes.
 *
 * @param {boolean} --watch
 */
gulp.task('scripts:play', function(done) {
  var watchGuard = false;

  if (config.env.watch) {
    webpack(config.tasks.play.scripts.webpack).watch(100, build(done));
  }
  else {
    webpack(config.tasks.play.scripts.webpack).run(build(done));
  }

  function build(cb) {
    return function(err, stats) {
      if (err) {
        throw new $util.PluginError('webpack', err);
      }
      else {
        $util.log($util.colors.blue('[webpack]'), stats.toString());
      }

      if (!watchGuard && cb) {
        watchGuard = true;
        cb();
      }
    };
  }
});

/**
 * Compiles templates for the playground.
 */
gulp.task('templates:play', function() {
  return gulp.src(config.tasks.play.templates.input)
    .pipe($jade(config.tasks.play.templates.jade))
    .pipe(gulp.dest(config.tasks.play.templates.output));
});

/**
 * Serves the playground to the browser.
 *
 * @param {number}  --port
 * @param {boolean} --watch
 */
gulp.task('serve:play', function() {
  browserSync(config.tasks.play.serve.browserSync);

  // Watch for changes.
  if (config.env.watch) {
    var entries = config.tasks.watch.play;

    for (var i = 0; i < entries.length; i++) {
      var entry = entries[i];
      gulp.watch(entry.files, entry.tasks);
    }
  }
});

/**
 * Builds the library and playground, option to watch for
 * file changes and serve.
 *
 * @param {number}  --port
 * @param {boolean} --watch
 * @param {boolean} --serve
 */
gulp.task('play', function(done) {
  var seq = ['clean', 'build', 'clean:play', ['styles:play', 'scripts:play', 'templates:play']];
  if (config.env.serve) seq.push('serve:play');
  seq.push(done);

  sequence.apply(null, seq);
});
