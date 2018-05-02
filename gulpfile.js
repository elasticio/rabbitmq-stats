const gulp = require('gulp');
const jasmine = require('gulp-jasmine');
const jscs = require('gulp-jscs');

const paths = {
    code: ['./lib/**/*.js'],
    spec: ['./spec/**/*.spec.js'],
    coverageReport: 'coverage/lcov.info'
};

gulp.task('jasmine', function () {
    return gulp
        .src(paths.spec)
        .pipe(jasmine({
            includeStackTrace: true,
            verbose: true
        }));
});

gulp.task('jscs', function () {
    return gulp
        .src(paths.code)
        .pipe(jscs());
});

gulp.task('test', ['jasmine']);
gulp.task('default', ['test']);