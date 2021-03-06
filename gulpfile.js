var gulp = require('gulp');
var watch = require('gulp-watch');
var scss = require("gulp-scss");
var copy = require('gulp-copy');
var connect = require('gulp-connect');
var del = require('del');
var vinylPaths = require('vinyl-paths');

gulp.task('clean', function () {
  del.sync('dist/**/*');
})

gulp.task('scss', function () {
    gulp.src(['src/scss/froala_blocks.scss'])
        .pipe(scss())
        .pipe(gulp.dest("dist/css"))
});

gulp.task('html', function () {
  gulp.src(['src/html/**/*.html'])
      .pipe(gulp.dest('dist'))
})

gulp.task('imgs', function () {
  gulp.src(['src/imgs/**/*'])
      .pipe(gulp.dest('dist/imgs'))
})

gulp.task('watch', [], function() {
  watch('dist').pipe(connect.reload());
  watch('src/html', function () {
    gulp.start(['html']);
  })
  watch('src/imgs', function () {
    gulp.start(['imgs']);
  })
  watch('src/scss', function () {
    gulp.start(['scss']);
  });
})

gulp.task('connect', function () {
    connect.server({
        root: ['dist', 'node_modules', 'screenshots'],
        port: 8001,
        livereload: true
    });
});

gulp.task('build', ['clean', 'html', 'imgs', 'scss']);

gulp.task('default', ['clean', 'html', 'imgs', 'scss', 'connect', 'watch'], function () {
});