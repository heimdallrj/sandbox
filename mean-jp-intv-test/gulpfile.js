var gulp = require('gulp'),
  less = require('gulp-less');

gulp.task('default', function(){
  return gulp.src('./public/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'));
});

gulp.watch('./public/less/*.less', ['default']);