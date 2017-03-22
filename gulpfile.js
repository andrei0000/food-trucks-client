const gulp = require('gulp')
const concat = require('gulp-concat')
const merge = require('merge2')
const ngtemplate = require('gulp-ngtemplate')
const eventStream = require('event-stream')
const uglify = require('gulp-uglify')
const htmlmin = require('gulp-htmlmin')
const gulpif = require('gulp-if')

function app(isProd) {
  let tmpls = gulp.src(['src/**/*.template.html'])
    .pipe(gulpif(isProd, htmlmin({collapseWhitespace: true})))
    .pipe(ngtemplate({
      standalone: true
    }))

  let scripts = gulp.src(['src/**/*.js'])
    .pipe(concat('app.js'))

  let index = gulp.src(['src/index.html'])
    .pipe(gulp.dest('./dist'))

  return merge(eventStream.merge(tmpls, scripts)
    .pipe(concat('app.js'))
    .pipe(gulpif(isProd, uglify()))
    .pipe(gulp.dest('./dist')), index)
}

gulp.task('app', () => {
  return app()
})

gulp.task('app:prod', () => {
  return app(true)
})

gulp.task('lib', () => {
  return gulp.src([
    'angular/angular.min.js',
    'angular/angular.min.js.map',
    'bootstrap/dist/css/bootstrap.min.css',
    'bootstrap/dist/css/bootstrap.min.css.map',
    'angular-ui-router/release/angular-ui-router.min.js',
    'angularjs-slider/dist/rzslider.min.js',
    'angularjs-slider/dist/rzslider.min.css'
  ], {
    cwd: 'node_modules/**'
  }).pipe(gulp.dest('dist/lib'))
})

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['app'])
})

gulp.task('build', ['lib', 'app'])
gulp.task('build:prod', ['lib', 'app:prod'])
gulp.task('default', ['build'])