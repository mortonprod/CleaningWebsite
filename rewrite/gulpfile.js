var gulp = require('gulp');
var ts = require("gulp-typescript");
var tsProject = ts.createProject("tsconfig.json");

///@function default
/// This will transpile the server code, move vendor code, then pug files
gulp.task("default", ['move'], function () {
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
        .pipe(gulp.dest('dist/public'));
});

