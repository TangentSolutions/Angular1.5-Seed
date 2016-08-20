var gulp = require('gulp');
var jspm = require('gulp-jspm');
var uglify = require('gulp-uglify');
var html_replace = require('gulp-html-replace');
var browser_sync = require('browser-sync').create();
var history_api_fallback = require('connect-history-api-fallback');
var ng_annotate = require('gulp-ng-annotate');
var eslint = require('gulp-eslint');

gulp.task('build:js', function () {
    return gulp.src('src/index.js')
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(ng_annotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('build:html', function () {
    gulp.src('./src/index.html')
        .pipe(html_replace({
            'js': './js/index.bundle.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('build:assets', function () {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('build', ['build:js', 'build:html', 'build:assets']);

gulp.task('lint', function () {
    return gulp.src(['./src/modules/**/*.js','./src/index.js'])
        .pipe(eslint())
        .pipe(eslint.format())
});

gulp.task('serve:dev', ['lint'], function () {
    browser_sync.init({
        files: './src/**/*',
        injectChanges: true,
        server: {
            baseDir: './src',
            middleware: [ history_api_fallback() ]
        }
    });
});

gulp.task('serve:dist', ['build'], function () {
    browser_sync.init({
        server: {
            baseDir: './dist',
            middleware: [ history_api_fallback() ]
        }
    });
});
