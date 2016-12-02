/* jshint node:true */
'use strict';
// generated on 2015-12-15 using generator-simpler-gulp-webapp 1.0.2
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var optipng = require('gulp-optipng');
var reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('app/assets/sass/main.scss')
    .pipe($.plumber())
    .pipe($.rubySass({
      style: 'expanded',
      precision: 10
    }))
    .pipe($.autoprefixer({browsers: ['last 1 version']}))
    .pipe(gulp.dest('app/assets/styles'));
});

gulp.task('jshint', function () {
  return gulp.src('app/assets/scripts/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('html', ['styles'], function () {
  var assets = $.useref.assets({searchPath: '{.tmp,app}'});

  return gulp.src('app/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  var options = ['-o2'];
  return gulp.src('app/content/2-projects/*/*.png')
    .pipe(optipng(options))
    .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')().concat('app/fassets/onts/**/*'))
    .pipe($.filter('**/*.{eot,svg,ttf,woff}'))
    .pipe($.flatten())
    .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    '!app/*.html',
    'node_modules/apache-server-configs/dist/.htaccess'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', require('del').bind(null, ['.tmp', 'dist']));

// Watch Files For Changes & Reload
gulp.task('serve', ['styles'], function () {
  browserSync.init({
    proxy: 'folio16.dev'
  });
  // browserSync({
  //   notify: false,
  //   // Run as an https by uncommenting 'https: true'
  //   // Note: this uses an unsigned certificate which on first access
  //   //       will present a certificate warning in the browser.
  //   // https: true,
  //   server: ['.tmp', 'app']
  // });

  gulp.watch(['app/**/*.html'], reload);
  gulp.watch(['app/assets/sass/**/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['app/assets/scripts/**/*.js'], ['jshint']);
  gulp.watch(['app/assets/images/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist'
  });
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('app/assets/sass/*.scss')
    .pipe(wiredep())
    .pipe(gulp.dest('app/assets/styles'));

  gulp.src('app/*.html')
    .pipe(wiredep())
    .pipe(gulp.dest('app'));
});

gulp.task('watch', ['connect'], function () {
  $.livereload.listen();

  // watch for changes
  gulp.watch([
    'app/*.html',
    '.tmp/assets/styles/**/*.css',
    'app/assets/scripts/**/*.js',
    'app/assets/images/**/*'
  ]).on('change', $.livereload.changed);

  gulp.watch('app/assets/sass/**/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('build', ['jshint', 'html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], function () {
  gulp.start('build');
});
