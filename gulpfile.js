var paths = {
  pages: ['src/*.html'],
  tsSources: ['src/main.ts'],
  entryScript: 'main.js',
  scripts: ['build/bundle.js'],
  watch: ['src/*'],
  distDir: 'dist',
  buildDir: 'build',
  targetScript: 'bundle.js'
};

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var typescript = require('gulp-typescript');

// Tasks

gulp.task('build', ['scripts-build']);
gulp.task('pack', ['scripts-pack', 'html-pack']);
gulp.task('default', ['build', 'pack']);
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
  return gulp.src(paths.tsSources)
    .pipe(typescript({moduleResolution: 'node'}))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts-bundle', function() {
  return browserify({entries: [`${paths.buildDir}/${paths.entryScript}`]})
    .bundle()
    .pipe(source(paths.targetScript))
    .pipe(gulp.dest(paths.buildDir));
});

gulp.task('scripts-build', ['scripts-compile', 'scripts-bundle']);

gulp.task('scripts-pack', function() {
  return gulp.src(`${paths.buildDir}/${paths.targetScript}`)
    .pipe(gulp.dest(paths.distDir));
});
