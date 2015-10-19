/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * Build tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

var config = require('./.taskconfig');
var del = require('del');
var gulp = require('gulp');
var r = require('requirejs');
var sequence = require('run-sequence');
var $rename = require('gulp-rename');
var $size = require('gulp-size');
var $uglify = require('gulp-uglify');
var $util = require('gulp-util');

/**
 * Cleans the build directory.
 */
gulp.task('clean', function(done) {
  del(config.tasks.clean.input).then(function(paths) {
    done();
  });
});

/**
 * Builds the JavaScript library.
 */
gulp.task('build', function(done) {
  r.optimize(config.tasks.build.r,
    function(res) {
      $util.log($util.colors.blue('[r]'), 'Successfully compiled library');

      gulp.src(config.tasks.build.input)
        .pipe($size({
          title: 'build:pretty',
          gzip: true
        }))
        .pipe($uglify())
        .pipe($rename(config.tasks.build.outputFile))
        .pipe($size({
          title: 'build:ugly',
          gzip: true
        }))
        .pipe(gulp.dest(config.tasks.build.output))
        .on('end', done);
    },
    function(err) {
      $util.log($util.colors.blue('[r]'), $util.colors.red(err));
      done();
    });
});
