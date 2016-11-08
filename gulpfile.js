var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var typescript = require('gulp-typescript');
var gutil = require('gulp-util');
var paths = {
  pages: ['./*.html']
};

var watchedBrowserify = watchify(browserify({
  basedir: '.',
  debug: true,
  entries: ['./main.ts'],  // todo: use src/main.ts
  cache: {},
  packageCache: {}
}).plugin(tsify));

gulp.task('copy-html', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
});

gulp.task('transpile', function() {
  var options = {moduleResolution: 'node'};
  gulp.src([
    './*.ts',
    '!./node_modules/**'
  ])
  .pipe(typescript(options))
  .pipe(gulp.dest('./'));
});

gulp.task('bundle', ['transpile'], function() {
  browserify(['./main.js'])
    .bundle()
    .pipe(process.stdout);  // TODO: output on dest/bundle.js
});

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('dist'));
}

gulp.task('default', ['copy-html'], bundle);
watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);
