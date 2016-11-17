var gulp = require('gulp');
var shell = require('gulp-shell')
var ts = require("gulp-typescript");


///@function default
/// This will transpile the server code, move vendor code, then pug files
gulp.task("default", ['clientBundle','clientAndServer','movePug'], function () {
 
});
gulp.task('watch', function () {
    gulp.watch(['./src/client/**/*'], ['clientAndServer','clientBundle']);
    gulp.watch(['./src/server/**/*'], ['clientAndServer']);
    gulp.watch(['./src/server/pug/*'], ['movePug']);
});

gulp.task('watchPug', function () {
    gulp.watch(['./src/server/pug/*'], ['movePug']);
});


gulp.task('clientBundle', shell.task([
    'webpack',
]))

gulp.task('clientAndServer', [], function () {
    var tsProject = ts.createProject('./tsconfig-server.json');
    var tsresult = tsProject.src()
     //   .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsresult.js
       // .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist')); 

});

gulp.task('movePug', function () {
    gulp.src([
        "src/server/pug/**"
    ], { base: "src/server" })
        .pipe(gulp.dest('dist/src/server'));
});

