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
var path = require('path');
var spawn = require('child_process').spawn;

gulp.task('clean:docs', function(done) {
  del(config.tasks.docs.clean).then(function(paths) {
    done();
  });
});

/**
 * Generates the docs.
 */
gulp.task('docs', ['clean:docs'], function(done) {
  var proc = spawn('./node_modules/.bin/jsdoc', [
    config.tasks.docs.input,
    '-r',
    '-R',
    config.tasks.docs.readme,
    '-c',
    config.tasks.docs.config
  ], {
    stdio: 'inherit'
  });
  proc.on('exit', done);
});
