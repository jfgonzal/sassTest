var gulp = require('gulp'),
    gutil = require('gulp-util'),
    browserify = require('gulp-browserify'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    concat = require('gulp-concat');

outputDir = 'builds/development/';
jsSources = ['components/scripts/child.js'];
sassSources = ['components/sass/style.scss'];

gulp.task('js', function(){
    gulp.src(jsSources)
        .pipe(concat('script.js'))
        .pipe(browserify({insertGlobals : true}))
        .pipe(gulp.dest(outputDir + 'js'))
        .pipe(connect.reload())
});

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

gulp.task('watch', function(){
    gulp.watch(jsSources, ['js']);
    gulp.watch('components/sass/**/*.scss', ['compass']);
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

gulp.task('default', ['html', 'js','compass', 'connect', 'watch']);