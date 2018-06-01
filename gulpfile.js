var gulp = require('gulp');
const babel = require('gulp-babel')
var less = require('gulp-less');
var path = require('path');

gulp.task('js', function() {
  gulp.src('src/js/*.js')
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(gulp.dest('dist/js'))
});
gulp.task('less', function () {
  return gulp.src('src/css/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/css'));
});
gulp.task('default', ['js', 'less']);
gulp.task('watch', function(){
   gulp.watch('src/css/*.less',['less']);
   gulp.watch('src/js/*.js',['js']);
})