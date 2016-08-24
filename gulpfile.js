var gulp = require('gulp');
var jspm = require('gulp-jspm');
var uglify = require('gulp-uglify');
var html_replace = require('gulp-html-replace');
var browser_sync = require('browser-sync').create();
var reload = browser_sync.reload;
var history_api_fallback = require('connect-history-api-fallback');
var ng_annotate = require('gulp-ng-annotate');
var eslint = require('gulp-eslint');

gulp.task('build:js', ['lint:fail'],  function () {
    return gulp.src('./src/index.js')
        .pipe(jspm({ fileName: 'index' }))
        .pipe(ng_annotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});

gulp.task('build:html', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('dist/'));
});

gulp.task('build:config', function () {
  gulp.src('./build/config.js')
      .pipe(gulp.dest('./dist'));
})

gulp.task('build:assets', function () {
    gulp.src('./src/assets/**/*')
        .pipe(gulp.dest('./dist/assets'));
});

gulp.task('build:deps', function () {
    gulp.src('./src/jspm_packages/**/*')
        .pipe(gulp.dest('./dist/jspm_packages'));
});

gulp.task('build', ['build:js', 'build:html', 'build:config', 'build:assets', 'build:deps']);

gulp.task('lint:fail', function () {
    return gulp.src(['./src/modules/**/*.js','./src/index.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('lint', function () {
    return gulp.src(['./src/modules/**/*.js','./src/index.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(reload({stream: true}));
});

gulp.task('serve:dev', ['lint:fail'] , function () {
    browser_sync.init({
        server: {
            baseDir: './src',
            middleware: [ history_api_fallback() ]
        },
        injectChanges: true,
        logFileChanges: false
    });

    gulp.watch(['./src/modules/**/*','./src/index.js'], ['lint']);
});

gulp.task('serve:dist',['build'], function () {
    browser_sync.init({
        server: {
            baseDir: './dist',
            middleware: [ history_api_fallback() ]
        }
    });
});

gulp.task('default', ['serve:dev']);
