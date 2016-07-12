'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    prefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = sass = require('gulp-sass'),
    spritesmith  = require('gulp.spritesmith'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    cssmin = require('gulp-minify-css'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        jsLibs: 'build/js/partials',
        css: 'build/css/',
        img: 'build/img/',
        svg: 'build/img/svg',
        //video: 'build/video',
        icons: 'build/img/icons',
        fonts: 'build/fonts/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/**/*.js',
        sass: 'src/sass/screen.sass',
        img: 'src/img/**/*.*',
        //video: 'src/video/**/*.*',
        svg: 'src/svg/*.svg',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        sass: 'src/sass/**/*.*',
        img: 'src/img/**/*.*',
        //video: 'src/video/**/*.*',
        svg: 'src/svg/*.svg',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    clean: './build'
};

gulp.task('server', function () {
    connect.server({
        livereload: true
    });
});

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function (cb) {
    rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
    gulp.src(path.src.html) 
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js) 
        .pipe(rigger()) 
        //.pipe(sourcemaps.init()) 
        //.pipe(uglify()) 
        //.pipe(sourcemaps.wborite()) 
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

//sass
gulp.task('sass:build', function () {
    return gulp.src(path.src.sass)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('sprite:build', function() {
    var spriteData = 
        gulp.src(path.src.icons)
            .pipe(spritesmith({
                imgName: 'sprite.png',
                cssName: '_sprite.scss',
                cssFormat: 'scss',
                algorithm: 'binary-tree',
                cssTemplate: 'sass.template.mustache',
                cssVarMap: function(sprite) {
                    sprite.name = sprite.name
                }
            }));

    spriteData.img.pipe(gulp.dest('build/img/'));
    spriteData.css.pipe(gulp.dest('./src/sass/lib/'));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        // .pipe(imagemin({
        //     progressive: true,
        //     svgoPlugins: [{removeViewBox: false}],
        //     use: [pngquant()],
        //     interlaced: true
        // }))
        .pipe(gulp.dest(path.build.img));
        // .pipe(reload({stream: true}));
});
gulp.task('svg:build', function () {
    gulp.src(path.src.svg) 
        .pipe(gulp.dest(path.build.svg));
        // .pipe(reload({stream: true}));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('build', [
    'html:build',
    'js:build',
    'sass:build',
    'sprite:build',
    'fonts:build',
    'image:build',
    'svg:build'
]);


gulp.task('watch', function(){
    watch([path.watch.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch([path.watch.sass], function(event, cb) {
        gulp.start('sass:build');
    });
    watch([path.watch.icons], function(event, cb) {
        gulp.start('sprite:build');
    });
    watch([path.watch.js], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.watch.img], function(event, cb) {
        gulp.start('image:build');
    });
    watch([path.watch.svg], function(event, cb) {
        gulp.start('svg:build');
    }); 

    watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });
});


gulp.task('default', ['build', 'server', 'watch']);