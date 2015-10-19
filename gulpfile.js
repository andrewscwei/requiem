/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * Gulp tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

require('./tasks/build');
require('./tasks/play');

var config = require('./tasks/.taskconfig');
var gulp = require('gulp');
var sequence = require('run-sequence');

/**
 * Default task.
 *
 * @param {Boolean} --watch
 */
gulp.task('default', function(done) {
  var seq = ['clean', 'build'];

  seq.push(function() {
    if (config.env.watch) {
      for (var i = 0; i < config.tasks.watch.build.length; i++) {
        var entry = config.tasks.watch.build[i];
        gulp.watch(entry.files, entry.tasks);
      }
    }

    done();
  });

  sequence.apply(null, seq);
});
