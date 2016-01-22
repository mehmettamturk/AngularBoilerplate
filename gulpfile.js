'use strict';

const gulp = require('gulp');
const del = require('del');
const argv = require('yargs').argv;
const replace = require('gulp-replace');
const inject = require('gulp-inject');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require("gulp-rename");
const cssmin = require('gulp-minify-css');
const templateCache = require('gulp-angular-templatecache');

let vendorCssFiles = [
    'src/lib/angular-ui-notification/dist/angular-ui-notification.min.css',
    'src/lib/semantic/dist/semantic.min.css',
    'src/lib/jquery-ui/themes/overcast/jquery-ui.min.css',
    'src/lib/jquery-ui/themes/overcast/theme.css',
    'src/lib/textAngular/dist/textAngular.css'
];

let cssFiles = [
    'src/css/reset.css',
    'src/css/*.css',
    'src/components/**/*.css'
];

let vendorJsFiles = [
    'src/lib/jquery/dist/jquery.min.js',
    'src/lib/jquery-ui/jquery-ui.min.js',
    'src/lib/jquery-ui/ui/i18n/datepicker-tr.js',
    'src/lib/semantic/dist/semantic.min.js',
    'src/lib/angular/angular.min.js',
    'src/lib/moment/moment.js',
    'src/lib/angular-sanitize/angular-sanitize.min.js',
    'src/lib/angular-resource/angular-resource.min.js',
    'src/lib/angular-touch/angular-touch.min.js',
    'src/lib/angular-animate/angular-animate.min.js',
    'src/lib/angular-ui-notification/dist/angular-ui-notification.min.js',
    'src/lib/angular-ui-router/release/angular-ui-router.min.js',
    'src/lib/angular-file-upload/dist/angular-file-upload.min.js',
    'src/lib/async/lib/async.js',
    'src/lib/lodash/lodash.min.js',
    'src/lib/alertify.js/lib/alertify.min.js',
    'src/lib/ng-file-upload-shim/ng-file-upload-shim.min.js',
    'src/lib/ng-file-upload/ng-file-upload.min.js',
    'src/lib/angular-i18n/angular-locale_tr-tr.js',
    'src/lib/angular-socialshare/dist/angular-socialshare.min.js',
    'src/lib/textAngular/dist/textAngular-rangy.min.js',
    'src/lib/textAngular/dist/textAngular-sanitize.min.js',
    'src/lib/textAngular/dist/textAngular.min.js'
];

let jsFiles = [
    'src/js/**/*.js',
    'src/components/**/*.js'
];

let fontFiles = [
    'src/lib/semantic/dist/themes/default/assets/fonts/*'
];

let compiledFileName = 'compiled-' + new Date().getTime();

function readConfig() {
    let env = argv.env || 'dev';
    let data = require('./config/' + env + '.json');
    return data;
}

gulp.task('clean', () => {
    return del(['www/**/*']);
});

gulp.task('clean:after-build', ['inject:build'], () => {
    return del([
        'www/components',
        'www/css',
        'www/js',
        'www/lib',
        'www/compiled/*',
        '!www/compiled/compiled-*'
    ]);
});

gulp.task('copy', ['clean'], () => {
    var files = [].concat(vendorCssFiles, cssFiles, vendorJsFiles, jsFiles);
    files.push('!src/js/config.js');
    files.push('src/img/**/*');

    return gulp
        .src(files, {base: 'src/'})
        .pipe(gulp.dest('www'));
});

gulp.task('copy:templates', ['clean'], () => {
    return gulp
        .src('src/components/**/*.html', {base: 'src/'})
        .pipe(gulp.dest('www'));
});

gulp.task('copy:fonts', ['clean'], () => {
    return gulp
        .src(fontFiles, {base: 'src/'})
        .pipe(gulp.dest('www'));
});

gulp.task('copy:fonts-build', ['clean'], () => {
    return gulp
        .src(fontFiles)
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('generate-config', ['copy'], () => {
    var config = readConfig();

    return gulp
        .src(['src/js/config.js'])
        .pipe(replace('__SITE_URL__', config.SITE_URL))
        .pipe(replace('__API_URL__', config.API_URL))
        .pipe(gulp.dest('www/js'));
});

gulp.task('minify:templates', ['clean'], function () {
    return gulp.src('src/components/**/*.html')
        .pipe(templateCache({
            root: './components/'
        }))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('minify:js', ['generate-config'], () => {
    var sources = jsFiles.concat([]);
    sources.push(
        '!src/js/config.js',
        'www/js/config.js'
    );

    return gulp
        .src(sources)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('www/compiled'))
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('concat:vendor-js', ['copy'], () => {
    var files = [].concat(vendorJsFiles);

    return gulp
        .src(files)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('concat:js', ['minify:js', 'minify:templates', 'concat:vendor-js'], () => {
    var files = [
        'www/compiled/vendor.js',
        'www/compiled/app.min.js',
        'www/compiled/templates.js'
    ];

    return gulp
        .src(files)
        .pipe(concat(compiledFileName + '.js'))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('minify:css', ['copy'], () => {
    return gulp
        .src(cssFiles)
        .pipe(concat('app.css'))
        .pipe(gulp.dest('www/compiled'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('concat:vendor-css', ['copy'], () => {
    var files = [].concat(vendorCssFiles);

    return gulp
        .src(files)
        .pipe(replace('themes/default/assets/', '../'))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('concat:css', ['minify:css', 'concat:vendor-css'], () => {
    var files = [
        'www/compiled/vendor.css',
        'www/compiled/app.min.css'
    ]

    return gulp
        .src(files)
        .pipe(concat(compiledFileName + '.css'))
        .pipe(gulp.dest('www/compiled'));
});

gulp.task('inject:dev', ['copy'], () => {
    let allFiles = [].concat(vendorCssFiles, cssFiles, vendorJsFiles, jsFiles);
    let sources = gulp.src(allFiles, {read: false});

    return gulp
        .src('src/index.html')
        .pipe(inject(sources, {relative: true, addRootSlash: true}))
        .pipe(gulp.dest('www'));
});

gulp.task('inject:build', ['concat:css', 'concat:js'], () => {
    let sources = gulp.src([
        'www/compiled/' + compiledFileName + '.css',
        'www/compiled/' + compiledFileName + '.js'
    ], {read: false});

    return gulp
        .src('src/index.html')
        .pipe(gulp.dest('www'))
        .pipe(inject(sources, {relative: true, addRootSlash: true}))
        .pipe(gulp.dest('www'));
});

gulp.task('watch:dev', () => {
    return gulp.watch(['src/**/*', '!src/**/lib/**/*'], ['dev']);
});

gulp.task('watch:build', () => {
    return gulp.watch(['src/**/*', '!src/**/lib/**/*'], ['build']);
});

gulp.task('dev', [
    'clean',
    'copy',
    'copy:templates',
    'copy:fonts',
    'generate-config',
    'inject:dev'
]);

gulp.task('build', [
    'clean',
    'copy',
    'copy:templates',
    'copy:fonts-build',
    'minify:templates',
    'generate-config',
    'minify:css',
    'concat:vendor-css',
    'concat:css',
    'minify:js',
    'concat:vendor-js',
    'concat:js',
    'inject:build',
    'clean:after-build'
]);
