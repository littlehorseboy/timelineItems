var gulp = require('gulp');
var concat = require('gulp-concat');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlreplace = require('gulp-html-replace');
var htmlmin = require('gulp-htmlmin');

var path = { src: './wwwroot/', dest: './build/' };

gulp.task('copylib', function () {
    return gulp.src(path.src + 'lib/**/*')
        .pipe(gulp.dest(path.dest + 'lib/'));
});

// gulp.task('copyimages', function () {
//     return gulp.src(path.src + 'images/**/*')
//         .pipe(gulp.dest(path.dest + 'images/'));
// });

gulp.task('concat', function () {
    return gulp.src(path.src + 'css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest(path.dest + 'css/'));
});

//gulp.task('concatJS', function () {
//    return gulp.src(path.src + 'js/**/*.js')
//        .pipe(concat('all.js'))
//        .pipe(gulp.dest(path.dest + 'js/'));
//});

gulp.task('minify-css', ['concat'], function () {
    return gulp.src(path.dest + 'css/all.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = ".css";
        }))
        .pipe(gulp.dest(path.dest + 'css/'));
});

gulp.task('uglify', function () {
    return gulp.src(path.src + 'js/**.*')
        .pipe(uglify())
        .pipe(rename(function (path) {
            path.basename += ".min";
            path.extname = '.js';
        }))
        .pipe(gulp.dest(path.dest + 'js'));
})

gulp.task('html-replace', function () {
    return gulp.src(path.src + '*.html')
        .pipe(htmlreplace({
            'css': 'css/all.min.css',
            'js': {
                src: [['js/setUrl.min.js'], ['js/setMapUrl.min.js'], ['js/myScript.min.js']],
                tpl: '<script src="%s"></script>'
            },
            'digMapJS': {
                src: [['js/digMap.min.js']],
                tpl: '<script src="%s"></script>'
            },
            'VueJS': {
                src: [['js/appVue.min.js']],
                tpl: '<script src="%s"></script>'
            }
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(path.dest));
});

gulp.task('default', ['copylib', 'copyimages', 'html-replace', 'minify-css', 'uglify']);
