var gulp = require('gulp')
var ts = require('gulp-typescript')
var stripDebug = require('gulp-strip-debug') 
var uglify = require('gulp-uglify') 
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var tsProject = ts.createProject("tsconfig.json")

var base = "project"
var src = base + "/src"
var dist = base + "/dist"

paths = {
    js: src + "/js",
    scss: src + "/scss",
    html: src + "/html",
}

gulp.task('watch', function () { 
    //livereload.listen(); 
    // gulp 3.x 에서는 task 목록을 [ ... ] 로 넘길 수 있었지만
    // gulp 4.x 에서는 gulp.series(...) 로 넘겨야한다!
    gulp.watch(paths.js, gulp.series('compile-js')); 
    //gulp.watch(paths.scss, ['compile-sass']); 
    //gulp.watch(paths.html, ['compress-html']); 
    //gulp.watch(dist + '/**').on('change', livereload.changed); 
}); 

gulp.task("compile-js", function() {
    return tsProject.src()
    .pipe(tsProject())
    .pipe(stripDebug())
    // https://stackoverflow.com/questions/36482076/how-to-uglify-javascript-classes
    // gulp-uglify가 아직 es6를 지원하지 않는다! 그래서 class 를 자꾸 ugilify 실패.
    // tsconfig.json에서 compilerOptions.target을 es5로 해주어야함.
    .pipe(uglify())
    .pipe(gulp.dest(dist))
    .pipe(livereload());
})

// gulp 4.x 에서는 gulp.series(...) 로 넘겨야한다!
gulp.task("default", gulp.series('compile-js', 'watch'))