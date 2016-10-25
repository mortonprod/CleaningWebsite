var gulp = require('gulp');
///var webpack = require('webpack-stream');
///gulp.task('default', function () {
///    return gulp.src('src/indexEntry.js')
///        .pipe(webpack(require('./webpack.config.js')))
///        .pipe(gulp.dest('dist/'));
///});

gulp.task('moveVendor', function () {
    gulp.src([
        "src/vendor/*"
    ], { base: "src" })
        .pipe(gulp.dest('dist'));
});

