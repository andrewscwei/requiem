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
  sequence.apply(null, seq);
});
