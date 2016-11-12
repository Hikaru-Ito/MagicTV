var gulp = require('gulp')
var sass = require('gulp-sass')
var browserify = require('browserify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var browserSync = require('browser-sync')
var reload = browserSync.reload

var config = {
  entryFile: './src/js/index.js',
  outputDir: './dist',
  outputFile: 'bundle.js',
  jsPath: './src/js/**/*.js',
  sassPath: './src/style/*.scss',
  htmlPath: './src/**/*.html',
  imagePath: './src/image/*.*'
}

gulp.task('html', function() {
  console.log('===========  🍺  HTML  🍺  ===========')
  gulp.src(config.htmlPath)
  .pipe(gulp.dest(config.outputDir))
  .pipe(reload({ stream: true }));
})

gulp.task('sass', function() {
  console.log('===========  🍺  SASS  🍺  ===========')
  gulp.src(config.sassPath)
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(config.outputDir))
  .pipe(reload({ stream: true }));
})

gulp.task('image', function() {
  console.log('===========  🍺  IMAGE  🍺  ===========')
  gulp.src(config.imagePath)
  .pipe(gulp.dest(config.outputDir + '/image/'))
})

gulp.task('browserify', function(done) {
  console.log('===========  🍺  Browserify  🍺  ===========')
  browserify(config.entryFile, { debug: true })
    .transform(babelify)
    .bundle()
    .on("error", function (err) { console.log("Error : " + err.message); })
    .pipe(source(config.outputFile))
    .pipe(gulp.dest(config.outputDir))
    .pipe(reload({ stream: true }))
  done()
})

gulp.task('browser-sync', function() {
   browserSync({
     server: {
       baseDir: config.outputDir,
     },
     port: 1126
   })
})

gulp.task('watch', function() {
  gulp.watch(config.jsPath, ['browserify'])
  gulp.watch(config.sassPath, ['sass'])
  gulp.watch(config.htmlPath, ['html'])
})

gulp.task('build', ['browserify', 'html', 'sass', 'image'])

gulp.task('default', ['build', 'watch', 'browser-sync'])
