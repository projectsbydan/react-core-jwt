var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require('webpack');


gulp.task('webpack-debug', function (callback) {
    webpack(require('./webpack.config.debug'), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString());
        if (stats.hasErrors()) throw new gutil.PluginError('webpack', 'Errors while compilation');

        callback();
    });
});

gulp.task('webpack-release', function (callback) {
    webpack(require('./webpack.config.release'), function (err, stats) {
        if (err) throw new gutil.PluginError('webpack', err);
        gutil.log('[webpack]', stats.toString());
        if (stats.hasErrors()) throw new gutil.PluginError('webpack', 'Errors while compilation');

        callback();
    });
});

gulp.task('Debug', ['webpack-debug']);
gulp.task('Release', ['webpack-release']);
