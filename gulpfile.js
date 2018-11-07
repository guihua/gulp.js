// require all plugins
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const connect = require('gulp-connect');
const cssBase64 = require('gulp-css-base64');
const livereload = require('gulp-livereload');
const minifycss = require('gulp-minify-css');
const notify = require('gulp-notify');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const include = require('gulp-include');
const babel = require('gulp-babel');

gulp.task('connect', () => {
	connect.server({
		root: 'build',
		port: 8989,
		livereload: true
	});
});

gulp.task('html', () =>
  gulp.src('src/project/**/*.html')
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'Html task complete'
    })));

gulp.task('images', () =>
  gulp.src('src/project/**/images/*')
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'images task complete'
    })));

gulp.task('less', () =>
  gulp.src('src/project/**/css/*.less')
    .pipe(less()) // less编译
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(minifycss()) // CSS压缩
    .pipe(gulp.dest('build/project'))
    .pipe(cssBase64({
      baseDir: "../images",
      maxWeightResource: "15360" // 设置上限为15KB，最大允许图片32KB-32768B
    })) // 图片base64位转化
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'less task complete'
    })));

gulp.task('js', () =>
  gulp.src('src/project/**/js/*.js')
    .pipe(include())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'js task complete'
    })));

// clean清理
gulp.task('clean', () =>
  gulp.src(['build/project/**/html/', 'build/project/**/images/', 'build/project/**/css/', 'build/project/**/js'], {
    read : false
  }).pipe(clean()));

// watch监测
// 监控HTML、less、Images和Javascript文件的修改，自动进行文件编译
gulp.task('watch', () => {
	gulp.watch('src/project/**/*.html', ['html']);
	gulp.watch('src/project/**/images/*', ['images', 'less']);
	gulp.watch('src/project/**/css/*.less', ['less']);
	gulp.watch('src/project/**/js/*.js', ['js']);

	livereload.listen();
});

// default
// 默认执行开发模式
gulp.task('default', ['clean'], () => {
	gulp.start('connect', 'html', 'images', 'less', 'js', 'watch');
});
