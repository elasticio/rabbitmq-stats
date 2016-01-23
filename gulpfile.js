var gulp = require('gulp');
var jasmine = require('gulp-jasmine');
var jscs = require('gulp-jscs');

var paths = {
    code: ['./lib/**/*.js'],
    spec: ['./spec/**/*.spec.js'],
    coverageReport: 'coverage/lcov.info'
};

gulp.task('jasmine', function() {
    return gulp
        .src(paths.spec)
        .pipe(jasmine({
            includeStackTrace: true,
            verbose: true
        }));
});

gulp.task('jscs', function() {
    return gulp
        .src(paths.code)
        .pipe(jscs());
});

gulp.task('test', ['jasmine']);
gulp.task('default', ['test']);