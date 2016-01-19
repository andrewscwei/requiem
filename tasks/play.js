/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * Playground tasks.
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

import autoprefixer from 'autoprefixer';
import browserSync from 'browser-sync';
import config from './.taskconfig';
import del from 'del';
import gulp from 'gulp';
import path from 'path';
import sequence from 'run-sequence';
import webpack from 'webpack';
import $jade from 'gulp-jade';
import $postcss from 'gulp-postcss';
import $sass from 'gulp-sass';
import $util from 'gulp-util';

/**
 * Cleans built files in the playground.
 */
gulp.task('clean:play', (done) => {
  del(config.tasks.play.clean.input).then((paths) => done());
});

/**
 * Compiles stylesheets for the playground.
 */
gulp.task('styles:play', () => {
  return gulp.src(config.tasks.play.styles.input)
    .pipe($sass(config.tasks.play.styles.sass).on('error', $sass.logError))
    .pipe($postcss([autoprefixer()]))
    .pipe(gulp.dest(config.tasks.play.styles.output));
});

/**
 * Compiles JavaScripts for the playground, option to watch for
 * changes.
 *
 * @param {boolean} --watch
 */
gulp.task('scripts:play', (done) => {
  let watchGuard = false;

  if (config.env.watch) {
    webpack(config.tasks.play.scripts.webpack).watch(100, build(done));
  }
  else {
    webpack(config.tasks.play.scripts.webpack).run(build(done));
  }

  function build(cb) {
    return (err, stats) => {
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
gulp.task('serve:play', () => {
  browserSync(config.tasks.play.serve.browserSync);

  // Watch for changes.
  if (config.env.watch) {
    let entries = config.tasks.watch.play;

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
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
gulp.task('play', (done) => {
  let seq = ['clean', 'build', 'clean:play', ['styles:play', 'scripts:play', 'templates:play']];
  if (config.env.serve) seq.push('serve:play');
  seq.push(done);

  sequence.apply(null, seq);
});
