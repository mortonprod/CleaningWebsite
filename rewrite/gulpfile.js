var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");
///var webpack = require('webpack-stream');
///gulp.task('default', function () {
///    return gulp.src('src/indexEntry.js')
///        .pipe(webpack(require('./webpack.config.js')))
///        .pipe(gulp.dest('dist/'));
///});

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task('move', ['moveVendor','movePug'], function () {
});

gulp.task('movePug', function () {
    gulp.src([
        "src/pug/**"
    ], { base: "src" })
        .pipe(gulp.dest('dist/public'));
});



gulp.task('moveVendor', function () {
    gulp.src([
        "src/vendor/**"
    ], { base: "src" })
        .pipe(gulp.dest('dist'));
});

