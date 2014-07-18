var gulp = require('gulp'); 
var sass = require('gulp-sass'); 
var watch = require('gulp-watch'); 
var cssmin = require('gulp-cssmin');
var open = require('gulp-open');
var connect = require('gulp-connect');

/*
 * Constants
 */
var PORT = '8888';

/*
 * Sass/CSS Tasks
 */
function runSASS(production) {
  return function() {
    var pipeline = gulp.src('./app.scss').pipe(sass());
    pipeline.pipe(gulp.dest('./'));
  }
}

gulp.task('watch:styles', function () {
  gulp.watch('./*.scss', ["build:styles"]);
});

gulp.task('build:styles', runSASS());

/*
 * Misc' Tasks
 */
gulp.task("open:website", function(){
  gulp.src("./index.html").pipe(open("", {
    url: "http://localhost:" + PORT
  }));
});

gulp.task('serve', function() {
  connect.server({
    root: './',
    port: PORT
  });
});

/*
 * Compound/Alias Tasks
 */
gulp.task('default', ['build:styles', 'open:website', 'serve', 'watch:styles']);
