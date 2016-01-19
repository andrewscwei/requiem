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
import $util from 'gulp-util';
import webpack from 'webpack';

/**
 * Cleans the built files.
 */
gulp.task('clean', (done) => {
  del(config.tasks.build.clean.input).then((paths) => done());
});

/**
 * Builds the JavaScript library.
 */
gulp.task('build', (done) => {
  let guard = false;

  if (config.env.watch) {
    webpack(config.tasks.build.webpack.pretty).watch(100, build(done));
  }
  else {
    webpack(config.tasks.build.webpack.pretty).run(build(() => {
      webpack(config.tasks.build.webpack.ugly).run(build(done));
    }));
  }

  function build(cb) {
    return (err, stats) => {
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
