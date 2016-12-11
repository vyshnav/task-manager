'use strict';

var gulp = require('gulp');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;

gulp.task('default', ['browser-sync'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files:  ['server/**/*.html','server/**/*.js','client/**/*.html','client/js/*.js','client/css/*.css'],
    port: 2000,
  });
});

gulp.task('watch', ['browser-sync'], function () {
   gulp.watch("*.html",reload);
   gulp.watch("*.js",reload);
   gulp.watch("*.css",reload);
});


gulp.task('nodemon', function(cb) {
  return nodemon({
    script: 'server/app.js',
    env: {
      'NODE_ENV': 'development'
    }
  }).on('start', function() {
    cb();
  }).on('restart');
});