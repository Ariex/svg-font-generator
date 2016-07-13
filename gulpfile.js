var async = require('async');
var gulp = require('gulp');
var iconfont = require('gulp-iconfont');
var con = require('gulp-consolidate');
var rename = require('gulp-rename');

var fontName = 'Icons';

var configs = {
    FontName: 'myfont',
    ClassPrefix: 's',
    OutputPath: 'build/'
}

gulp.task('build', function(done) {
    var iconStream = gulp.src(['svg/*.svg'])
        .pipe(iconfont({
            fontName: 'myfont'
        }));

    async.parallel([
        function handleCSS(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('templates/template.css')
                    .pipe(con('lodash', {
                        glyphs: glyphs,
                        fontName: configs.FontName,
                        fontPath: '',
                        className: 's'
                    }))
                    .pipe(rename(configs.FontName + '.css'))
                    .pipe(gulp.dest(configs.OutputPath))
                    .on('finish', cb);
            });
        },
        function handleLESS(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('templates/template.less')
                    .pipe(con('lodash', {
                        glyphs: glyphs,
                        fontName: configs.FontName,
                        fontPath: '',
                        className: 's'
                    }))
                    .pipe(rename(configs.FontName + '.less'))
                    .pipe(gulp.dest(configs.OutputPath))
                    .on('finish', cb);
            });
        },
        function handleSCSS(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('templates/template.scss')
                    .pipe(con('lodash', {
                        glyphs: glyphs,
                        fontName: configs.FontName,
                        fontPath: '',
                        className: 's'
                    }))
                    .pipe(rename(configs.FontName + '.scss'))
                    .pipe(gulp.dest(configs.OutputPath))
                    .on('finish', cb);
            });
        },
        function outputDemoPath(cb) {
            iconStream.on('glyphs', function(glyphs, options) {
                gulp.src('templates/template.vash')
                    .pipe(con('vash', {
                        Title: "Icon Demo",
                        Icons: glyphs,
                        FontFamily: configs.FontName,
                        ClassPrefix: configs.ClassPrefix
                    }))
                    .pipe(rename('demo.html'))
                    .pipe(gulp.dest(configs.OutputPath))
                    .on('finish', cb);
            })
        },
        function handleFonts(cb) {
            iconStream
                .pipe(gulp.dest(configs.OutputPath))
                .on('finish', cb);
        }
    ], done);
});
