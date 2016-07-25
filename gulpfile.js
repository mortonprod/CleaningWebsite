///Must install gulp-cli before you can use this in the command line. Make sure this is in you path.
var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('App/tsconfig.json');
var nodeLocation = "../node_modules/**"
var finalDeploy = "AppDeploy"
var systAng2 = "App/systemjs.config.js"
var htmlString = "App/**/*.html"
var tsString = "App/**/*.ts"
var baseString = "App"; ///This is the directory which you should begin to build file structure in dest. 
///TODO:Does not copy all files at once??? It also appears to take some time so you need to re run this a few times.
gulp.task("scriptsNStyles", function(){
    gulp.src([
        'core-js/client/**',
        'systemjs/dist/system.src.js',
        'reflect-metadata/**',
        'rxjs/**',
        'zone.js/dist/**',
        '@angular/**',
        'jquery/dist/jquery.*js',
        'bootstrap/dist/js/bootstrap.*js'
    ], {
            cwd: nodeLocation
        })
        .pipe(gulp.dest(finalDeploy + "/node"));
});

gulp.task('ts', function () {
    var tsResult = gulp.src([
        tsString
    ], { base: baseString })
        .pipe(ts(tsProject), undefined, ts.reporter.fullReporter());
    return tsResult.js.pipe(gulp.dest(finalDeploy));
});

gulp.task('moveHtml', function () {
    gulp.src([
        htmlString
    ], { base: baseString })
        .pipe(gulp.dest(finalDeploy));
});

gulp.task('moveAng2Setup', function () {
    gulp.src([
        systAng2
    ], { base: "." })
        .pipe(gulp.dest(finalDeploy));
});

gulp.watch(systAng2, function () {
    gulp.run('moveAng2Setup');
}); 

gulp.watch('App/**/*.ts', function () {
    gulp.run('ts');
});

gulp.watch(htmlString, function () {
    gulp.run('moveHtml');
});

gulp.watch(tsString, function () {
    gulp.run('ts');
});