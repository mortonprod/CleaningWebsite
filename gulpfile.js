var gulp = require('gulp');
var shell = require('gulp-shell')
var ts = require("gulp-typescript");
gulp.task("default", ['watch'], function () {

});
gulp.task('watch', function () {
    gulp.watch(['./src/client/**/*'], ['client']);
    gulp.watch(['./src/bundle/**/*'], ['bundle']);
    gulp.watch(['./src/server/**/*','./src/config.ts'], ['server']);
    gulp.watch(['./serverDev/*'], ['serverDev']);
    gulp.watch(['./ssl/*'], ['ssl']);
    gulp.watch(['./src/server/pug/*'], ['movePug']);
    gulp.watch(['./src/favicon.png'], ['moveImg']);
    gulp.watch(['./manifest.webmanifest'], ['moveManifest']);
});

gulp.task('docker', [], function () {
    return shell.task([
        'docker-compose up'
    ])
})

gulp.task('client', ['bundle'], function () {
    var tsProject = ts.createProject('./src/client/tsconfig.json');
    var tsresult = tsProject.src()
        .pipe(tsProject());

    tsresult.js
        .pipe(gulp.dest('./dist/client'));
    return gulp.start('docker');
});
gulp.task('bundle', [], function () {
    return shell.task([
        'webpack -p'
    ])
})
gulp.task('server', [], function () {
    var tsProject = ts.createProject('./src/server/tsconfig.json');
    var tsresult = tsProject.src()
        .pipe(tsProject());

    tsresult.js
        .pipe(gulp.dest('./dist/server'));
    return gulp.start('docker');

});


gulp.task('ssl', [], function () {
    gulp.src([
        "ssl/*"
    ]).pipe(gulp.dest('dist/assets/ssl'));
    return gulp.start('docker');
});

gulp.task('movePug', function () {
    gulp.src([
        "src/server/pug/**"
    ]).pipe(gulp.dest('dist/server/pug'));
});


gulp.task('serverDev', [], function () {
    var tsProject = ts.createProject('./serverDev/tsconfig.json');
    var tsresult = tsProject.src()
        .pipe(tsProject());

    return tsresult.js
        .pipe(gulp.dest('./serverDev'));

});

gulp.task('moveImg', function () {
    gulp.src([
        "src/favicon.png"
    ]).pipe(gulp.dest('dist/assets/images'));
});

gulp.task('moveManifest', function () {
    gulp.src([
        "manifest.webmanifest"
    ]).pipe(gulp.dest('dist/assets'));
});
