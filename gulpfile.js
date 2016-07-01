// var gulp = require('gulp');
// var jshint = require('gulp-jshint');
// var watch = require('gulp-watch');

// gulp.task('default', ['lint', 'watch']);

// gulp.task('watch', function() {
//   gulp.watch('path/to/javascript/files/**/*.js', ['lint']);
// });


// gulp.task('lint', function() {
//   return gulp.src(['path/to/javascript/files/**/*.js'])
//     .pipe(jshint())
//     .pipe(jshint.reporter('jshint-stylish'))
//     .on('error', function() {}
//   );
// });



// gulp.task('watch', function() {
//   // Run the link task when any JavaScript file changes
//   gulp.watch(['./src/**/*.js'], ['lint', 'specs']);

//   gutil.log(gutil.colors.bgGreen('Watching for changes...'));
// });


var gulp = require('gulp');
var jshint = require('gulp-jshint');
var watch = require('gulp-watch');

gulp.task('default', ['lint', 'watch']);

gulp.task('watch', function() { 
  gulp.watch('./js/**/*.js', ['lint']);
});

gulp.task('lint', function() {
  return gulp.src('./js/**/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});