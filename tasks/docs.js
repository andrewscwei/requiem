/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

import config from './.taskconfig';
import del from 'del';
import gulp from 'gulp';
import path from 'path';
import $pages from 'gulp-gh-pages';
import { spawn } from 'child_process';

gulp.task('clean:docs', (done) => {
  del(config.tasks.docs.clean).then((paths) => done());
});

/**
 * Generates the docs.
 */
gulp.task('docs', ['clean:docs'], (done) => {
  let proc = spawn('./node_modules/.bin/jsdoc', [
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

/**
 * Deploys docs to GitHub pages.
 */
gulp.task('deploy:docs', ['docs'], () => {
  return gulp.src(path.join(config.paths.docs, '**', '*'))
    .pipe($pages());
});
