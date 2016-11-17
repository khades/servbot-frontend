var gulp = require('gulp')
var bro = require('gulp-bro')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var babelify = require('babelify')
var gulpPostcss = require("gulp-postcss")
var postcss = require('postcss')
var autoprefixer = require('autoprefixer');
gulp.task('build-js', function () {
  gulp.src('./js/app.js')
    .pipe(sourcemaps.init())
    .pipe(bro({
      transform: [babelify.configure({
        presets: ['es2015']
      })]
    }))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
})

gulp.task('build-sass', function () {
  var includePaths = require("bourbon").includePaths
  return gulp.src('./scss/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: includePaths
    }).on('error', sass.logError))
    .pipe(gulpPostcss([
      require('postcss-inline-svg'),
      autoprefixer(),
      require('cssnano')
    ]))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist'))
});

gulp.task('build', ['build-js', 'build-sass'])

