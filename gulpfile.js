var gulp = require('gulp');
var concat = require('gulp-concat');
var scss = require('gulp-scss');
var minify = require('gulp-clean-css');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var compress = require('gulp-imagemin');


gulp.task('connect', function () {
    connect.server({
        port: 3003,
        livereload: true,
        root: './'
    })
})

gulp.task('html', function () {
    return gulp.src('./index.html')
        .pipe(connect.reload())
});

gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename('main.min.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(connect.reload())
})


gulp.task('css', function () {
    return gulp.src(['./scss/header.scss','./scss/main.scss'])
        .pipe(concat('all.scss'))
        .pipe(gulp.dest('./scss'))
        .pipe(scss())
        .pipe(autoprefixer({
            browsers: ['last 3 versions']
        }))
        .pipe(sourcemaps.init())
        .pipe(minify())
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(connect.reload())
});


gulp.task('img', function () {
    return gulp.src('./images/*')
        .pipe(compress({
            verbose: true
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(connect.reload())
});



gulp.task('watch', function () {
    gulp.watch('./index.html', ['html']);
    gulp.watch('./scss/*.scss', ['css']);
    gulp.watch('./img/*', ['img']);
    gulp.watch('./js/*.js', ['js']);

});

gulp.task('default', ['html','css', 'js','connect','img', 'watch']);
