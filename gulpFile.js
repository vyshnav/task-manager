'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var reload = browserSync.reload;

gulp.task('default', ['browser-sync','watch'], function() {});

gulp.task('browser-sync', ['nodemon'], function() {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
    files:  ['server/**/*.html','server/**/*.js','client/**/*.html','client/js/*.js','client/css/*.css','client/scss/*.scss'],
    port: 2000,
  });
});

// Static Server + watching scss/html files
gulp.task('watch', ['browser-sync'], function () {
   gulp.watch("*.html",reload);
   gulp.watch("*.js",reload);
   gulp.watch("*.css",reload);


});

gulp.task('watch', ['sass'], function() {
    gulp.watch("*.scss", ['sass']);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("client/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("client/css"))
        .pipe(browserSync.stream());
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