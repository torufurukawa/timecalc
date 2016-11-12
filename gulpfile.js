var paths = {
  pages: ['./*.html'],
  tsSources: ['./main.ts'],
  entryScript: 'main.js',
  scripts: ['build/bundle.js'],  // ??
  watch: ['./*.html', './*.ts'],
  distDir: 'dist',
  buildDir: 'build',
  targetScript: 'bundle.js'
};

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var tsify = require('tsify');
var typescript = require('gulp-typescript');
var gutil = require('gulp-util');

// Tasks

gulp.task('build', ['scripts-build'], function() {});
gulp.task('pack', ['scripts-pack', 'html-pack'], function() {});
gulp.task('default', ['build', 'pack'], function() {});
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.watch, ['default']);
});


// HTML tasks

gulp.task('html-pack', function() {
  return gulp.src(paths.pages)
    .pipe(gulp.dest(paths.distDir));
});

// Script tasks

gulp.task('scripts-compile', function() {
  gulp.src(paths.tsSources)
  .pipe(typescript({moduleResolution: 'node'}))
  .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts-bundle', function() {
  browserify({entries: [`${paths.buildDir}/${paths.entryScript}`]})
    .bundle()
    .pipe(source(paths.targetScript))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts-build', ['scripts-compile', 'scripts-bundle'],
          function() {});

gulp.task('scripts-pack', function() {
  return gulp.src(`${paths.buildDir}/${paths.targetScript}`)
    .pipe(gulp.dest(paths.distDir));
});
