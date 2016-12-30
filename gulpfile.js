var gulp = require('gulp');
var shell = require('gulp-shell')
var ts = require("gulp-typescript");

//
//Gulp tasks
//
gulp.task("default", ['clientBundle', 'clientAndServer'], function () {

});
gulp.task('clientBundle', shell.task([
    'webpack -p'
]))
gulp.task('clientAndServer', ["client", "movePug"], function () {
    gulp.src([
        "ssl/*"
    ]).pipe(gulp.dest('dist/assets/ssl'));
    var tsProject = ts.createProject('./src/server/tsconfig.json');
    var tsresult = tsProject.src()
        .pipe(tsProject());

    return tsresult.js
        .pipe(gulp.dest('./dist/server'));

});
gulp.task('client', [], function () {
    var tsProject = ts.createProject('./src/client/tsconfig.json');
    var tsresult = tsProject.src()
        .pipe(tsProject());

    return tsresult.js
        .pipe(gulp.dest('./dist/client'));

});
gulp.task('movePug', function () {
    gulp.src([
        "src/server/pug/**"
    ]).pipe(gulp.dest('dist/server/pug'));
});

///
///Watch gulp tasks
///
gulp.task('watch', function () {
    gulp.watch(['./src/client/**/*'], ['clientAndServer', 'clientBundle']);
    gulp.watch(['./src/server/**/*'], ['clientAndServer']);
    gulp.watch(['./src/server/pug/*'], ['movePug']);
});


gulp.task('watchPug', function () {
    gulp.watch(['./src/server/pug/*'], ['movePug']);
});

