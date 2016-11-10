var paths = {
  pages: ['./*.html'],
  scripts: ['build/bundle.js']
};

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var typescript = require('gulp-typescript');
var gutil = require('gulp-util');

// Tasks

gulp.task('pack', ['js-pack', 'html-pack'], function() {});

// HTML tasks

gulp.task('html-pack', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest('dist'));
});

// Script tasks

gulp.task('scripts-compile', function() {
  var options = {moduleResolution: 'node'};
  gulp.src([
    './*.ts',
    '!./node_modules/**'
  ])
  .pipe(typescript(options))
  .pipe(gulp.dest('./'));
});

gulp.task('scripts-build', function() {
  browserify({entries: ['./main.js']})
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build-scripts', ['scripts-compile', 'scripts-build'], function() {});

gulp.task('js-pack', function() {
  return gulp.src(paths.scripts).pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(['./*.html'], ['copy-html']);
  gulp.watch(['./*.ts'], ['bundle', 'pack']);
});
