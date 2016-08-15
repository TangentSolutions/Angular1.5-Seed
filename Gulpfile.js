/**
 * core scripts: ['gulp build', 'gulp serve:dev', 'gulp serve:dist']
 * sub sripts: ['gulp build:js', 'gulp build:html', 'gulp build:assets']
 */

var gulp = require('gulp');
var gulp_jspm = require('gulp-jspm');
var uglify = require('gulp-uglify');
var htmlreplace = require('gulp-html-replace');
var browserSync = require('browser-sync').create();

gulp.task('build:js', function() {
    return gulp.src('src/index.js')
        .pipe(gulp_jspm({selfExecutingBundle: true}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('build:html', function () {
  gulp.src('./src/index.html')
    .pipe(htmlreplace({
        'js': './js/index.bundle.js'
    }))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('build:assets', function () {
  gulp.src('./src/assets/**/*')
    .pipe(gulp.dest('./dist/assets'));
});

gulp.task('build', ['build:js', 'build:html', 'build:assets']);

gulp.task('serve:dev', function () {
  browserSync.init({
    files: './src/**/*',
    injectChanges: true,
    server: {
      baseDir: './src'
    }
  });
});

gulp.task('serve:dist', ['build'], function () {
  browserSync.init({
      server: {
          baseDir: './dist'
      }
  });
});
