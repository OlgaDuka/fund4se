'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var mqpacker = require('css-mqpacker');
var minifycss = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');
var rigger = require('gulp-rigger');
var del = require('del');
var ghPages = require('gulp-gh-pages');

// CLEAN BUILD

gulp.task('clean', function(done) {
  return del('build', done);
});

// HTML

gulp.task('html:del', function(done) {
  return del('build/*.html', done);
});

gulp.task('html:copy', function(done) {
  return gulp.src('*.html')
    .pipe(rigger())
    .pipe(gulp.dest('build'));
    done();
});

gulp.task('html', gulp.series('html:del', 'html:copy'));

// CSS

gulp.task('style', function (done) {
  return gulp.src('sass/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({
      includePaths: require("node-normalize-scss").includePaths
    }))
    .pipe(postcss([
      autoprefixer(),
      mqpacker({
        sort: true
      })
    ]))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('build/css'))
    .pipe(minifycss())
    .pipe(sourcemaps.write())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
    done();
});

// JS
gulp.task('js:del', function(done) {
  return del('build/js', done);
});

gulp.task('js:libraries', function(done) {
  return gulp.src('js/libraries/*.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('build/js/libraries'))
    .pipe(server.stream());
    done();
});


gulp.task('js:scripts', function(done) {
  return gulp.src('js/scripts/*.js')
    .pipe(plumber())
    .pipe(gulp.dest('build/js'))
    .pipe(uglify())
    .pipe(rename(function(path){
      path.basename += '.min';
    }))
    .pipe(gulp.dest('build/js'))
    .pipe(server.stream());
    done();
});

gulp.task('js', gulp.series('js:del', 'js:libraries', 'js:scripts'));

// FONTS

gulp.task('fonts:del', function(done) {
  return del('build/fonts', done);
});

gulp.task('fonts:copy', function(done) {
  return gulp.src('fonts/**/*.{woff,woff2}')
    .pipe(gulp.dest('build/fonts/'));
    done();
});

gulp.task('fonts', gulp.series('fonts:del', 'fonts:copy'));

// FAVICONS

gulp.task('favicons:del', function(done) {
  return del('build/img/favicons', done);
});

gulp.task('favicons:copy', function(done) {
  return gulp.src('img/favicons/*.{png,jpg,json,jpeg,svg}')
    .pipe(gulp.dest('build/img/favicons/'));
    done();
});

gulp.task('favicons', gulp.series('favicons:del', 'favicons:copy'));

// IMAGES

gulp.task('img:del', function(done) {
  return del('build/img/*.*', done);
});

gulp.task('img:copy', function(done) {
  return gulp.src('img/*.{png,jpg,gif,svg}')
    .pipe(gulp.dest('build/img/'));
    done();
});

gulp.task('img:minify', function(done) {
  return gulp.src('img/**/*.{png,jpg,gif,svg}')
    .pipe(imagemin([
      imageminJpegRecompress({
        progressive: true,
        max: 70,
        min: 65
      }),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('img-prod', gulp.series('img:del', 'img:copy', 'img:minify'));
gulp.task('img-dev', gulp.series('img:del', 'img:copy'));

// SVG-SPRITE

gulp.task('svg-sprite:del', function(done) {
  return del('build/img/svg-sprite');
  done();
});

gulp.task('svg-sprite:copy', function(done) {
  return gulp.src('img/svg-sprite/*.svg')
    .pipe(gulp.dest('build/img/svg-sprite'))
    .pipe(svgmin())
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
    done();
});

gulp.task('svg-sprite', gulp.series('svg-sprite:del', 'svg-sprite:copy'));

//GH-PAGES

gulp.task('deploy', function() {
  return gulp.src('build/**/*')
    .pipe(ghPages());
});

// LIVE SERVER

gulp.task('reload', function(done){
  server.reload();
  done();
});

gulp.task('serve', function(done) {
  server.init({
    server: 'build',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('sass/**/*.{scss,sass}', gulp.series('style'));
  gulp.watch('*.html', gulp.series('html', 'reload'));
  gulp.watch('templates/*.html', gulp.series('html', 'reload'));
  gulp.watch('js/**/*.js', gulp.series('js', 'reload'));
  done();
});

// DEV

gulp.task('dev', gulp.series('clean',
  gulp.series(
    'html',
    'style',
    'js',
    'fonts',
    'favicons',
    'img-dev',
    'svg-sprite'
  )
));

// BUILD

gulp.task('build', gulp.series('clean',
  gulp.series(
    'html',
    'style',
    'js',
    'fonts',
    'favicons',
    'img-prod',
    'svg-sprite'
  )
));
