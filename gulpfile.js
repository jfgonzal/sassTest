var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    jshint = require('gulp-jshint'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

outputDir = 'builds/development/';
jsSources = ['components/scripts/child.js'];
sassSources = ['components/sass/style.scss'];

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(jshint('./.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(connect.reload())
});

/*
gulp.task('compass', function(){
    gulp.src(sassSources)
        .pipe(compass({
            sass: 'components/sass',
            image: outputDir + 'images',
            style: 'nested'
        })
            .on('error', gutil.log))
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload())
});
*/


gulp.task('sass', function () {
    return sass('components/sass/style.scss', {
        sourcemap: true,
        style: 'expanded'
    })
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('builds/development/css'))
        .pipe(connect.reload());
});


gulp.task('watch', function(){
    gulp.watch('builds/development/js/**/*', ['js']);
    gulp.watch('components/sass/**/*.scss', ['sass']);
    gulp.watch('builds/development/*.html', ['html']);
});

gulp.task('html', function(){
    gulp.src('builds/development/*.html')
        .pipe(connect.reload())
});

gulp.task('connect', function(){
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('default', ['html', 'sass', 'connect', 'watch']);