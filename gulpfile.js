'use strict';

const gulp = require('gulp'),
      newer = require('gulp-newer'),
      imagemin = require('gulp-imagemin'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      pump = require('pump'),
      lodash = require('lodash'),
      browsersync = require('browser-sync');

const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')

const folder = { 
    src: 'src/',
    dist: '../src/main/resources/public/v2/'
};

gulp.task('webpack', () =>
    gulp.src('./src/vuejs/app.js')
        .pipe(webpackStream(webpackConfig, webpack))
        .on('error', function handleError() { this.emit('end') })
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(folder.dist))
)

gulp.task('copy-assets', function() {
    lodash({
        js: [
            './node_modules/jquery/dist/jquery.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
            './node_modules/moment/min/moment.min.js',
            './node_modules/datatables.net/js/jquery.dataTables.js',
            './node_modules/@fengyuanchen/datepicker/dist/datepicker.min.js',
            './node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
            './node_modules/toastr/build/toastr.min.js',
        ],
        scss: [
            './node_modules/bootstrap/dist/css/bootstrap-grid.css',
            './node_modules/toastr/build/toastr.min.css',
            './node_modules/@fengyuanchen/datepicker/dist/datepicker.css',
        ]
    }).forEach(function (assets, type) {
        if (type == "scss") { 
            gulp.src(assets)
            .pipe(rename({ prefix: '_', extname: '.scss' }))
            .pipe(gulp.dest(folder.src + 'scss/vendor'));
        } else {
            gulp.src(assets).pipe(gulp.dest(folder.src + 'js/vendor'));
        }
    });
});

// image processing
gulp.task('imageMin', function(){
    var out = folder.dist + 'img';
    return gulp.src(folder.src + 'img/**/*')
        .pipe(newer(out))
        .pipe(imagemin())
        .pipe(gulp.dest(out));
});

// copy fonts from src folder to dist folder
gulp.task('fonts', function(){
    return gulp.src([ folder.src + 'fonts/**/*' ]) .pipe(gulp.dest(folder.dist + 'fonts/'));
});

// copy html files from src folder to dist folder, also copy favicons
gulp.task('html', function(){
    return gulp.src([
            folder.src + '*.html',
            folder.src + '*.ico', // favicons
            folder.src + 'browserconfig.xml',
            folder.src + '*.png'
        ])
        .pipe(gulp.dest(folder.dist));
});

// compile & minify sass
gulp.task('css', function () {
    return gulp.src(folder.src + '/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()) // scss to css
        .pipe(autoprefixer({ browsers: ['last 2 version'] }))
        .pipe(gulp.dest(folder.dist + 'css/'))
        .pipe(rename({ suffix: ".min" }))
        .pipe(cssnano({ discardComments: {removeAllButFirst: true} }))
        .pipe(sourcemaps.write('./')) // source maps for main.min.css
        .pipe(gulp.dest(folder.dist + 'css/'));
});

// js
gulp.task('javascript', function(){
    var out = folder.dist + 'js/';

    // It's important to keep files at this order so that `main.js` can be executed properly
    return gulp.src([
            folder.src + 'js/vendor/*.js',
            folder.src + 'js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(gulp.dest(out))
        .pipe(rename({ suffix: ".min" }))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(out));
});

// live browser loading
gulp.task('browserSync', function() { browsersync.init({ server: { baseDir: folder.dist  } }); });

// watch all changes
gulp.task('watch', function(){
    gulp.watch(folder.src + '*.html', ['html', browsersync.reload]);
    gulp.watch(folder.src + 'img/**/*', ['imageMin', browsersync.reload]);
    gulp.watch(folder.src + 'fonts/**/*', ['fonts', browsersync.reload]);
    gulp.watch(folder.src + 'scss/**/*', ['css', browsersync.reload]);
    gulp.watch(folder.src + 'js/**/*', ['javascript', browsersync.reload]);
    gulp.watch(folder.src + 'vuejs/**/*', ['webpack', browsersync.reload]);
});

// default task
gulp.task('default', ['copy-assets', 'html', 'imageMin', 'fonts', 'css', 'webpack', 'javascript', 'watch']);