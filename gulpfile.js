var gulp = require('gulp');
var shell = require('gulp-shell')
var ts = require("gulp-typescript");


///@function default
/// This will transpile the server code, move vendor code, then pug files
gulp.task("default", ['client','server'], function () {
 
});

gulp.task('client', shell.task([
    'webpack',
]))


//gulp.task('server', ['movePug','clientOnServer'], function () {
//    return tsProjectServer.src()
//        .pipe(tsProject())
//        .js.pipe(gulp.dest("dist"));
//
//});

gulp.task('clientOnServer', [], function () {
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
        .pipe(gulp.dest('dist/server'));
});

