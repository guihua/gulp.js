/**
 * Gulp编译配置文件
 */

// require all plugins
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const concat = require('gulp-concat');
const connect = require('gulp-connect');
const cssBase64 = require('gulp-css-base64');
const include = require('gulp-include');
const jshint = require('gulp-jshint');
const livereload = require('gulp-livereload');
const minifycss = require('gulp-minify-css');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const sass = require('gulp-ruby-sass');
const uglify = require('gulp-uglify');

// 建立本地服务
// 默认为 localhost，或者本地 IP 地址
// @params：
// 		root——指定根目录
// 		port——指定访问端口，避免被占用引起冲突
// 		livereload——根目录下文件改变时，自动刷新
gulp.task('connect', () => {
	connect.server({
		root: 'build',
		port: 8989,
		livereload: true
	});

	// 增加本地静态页面浏览机制
	// 1.html模板
	// 2.引入同名JS和CSS文件
});

// html任务
gulp.task('html', () =>
  gulp.src('src/project/**/*.html')
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'Html task complete'
    })));

// images任务
gulp.task('images', () =>
  gulp.src('src/project/**/images/*')
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'images task complete'
    })));

// scss任务
// 1.SCSS文件编译成CSS
// 2.压缩CSS
// 3.images to base64
gulp.task('scss', () =>
  gulp.src('src/project/**/css/*.scss')
    .pipe(sass({
      style : 'expanded'
    })) // SCSS编译
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
      message : 'Scss task complete'
    })));

// scripts任务
// 1.合并include引入的js文件
// 2.js语法检查
// 3.js压缩
gulp.task('scripts', () =>
  gulp.src('src/project/**/js/*.js')
    .pipe(include()) // 合并以‘//= include path/to/xx.js’格式引入的js文件，或者‘#= require_tree path/to/folder’格式引入的文件夹，include关键字可以换成require
    .pipe(jshint()) // js语法检查
    .pipe(uglify()) // js压缩混淆
    .pipe(gulp.dest('build/project'))
    .pipe(livereload())
    .pipe(notify({
      message : 'Scripts task complete'
    })));

// zeptoJS
// zepto js执行合并、压缩和混淆
gulp.task('zeptoJS', () =>
  gulp.src('src/javascript/zepto/src/*.js')
    .pipe(concat('zepto.js'))
    .pipe(jshint())
    .pipe(gulp.dest('src/javascript/zepto'))
    .pipe(uglify())
    .pipe(rename('zepto.min.js'))
    .pipe(gulp.dest('src/javascript/zepto/')));

// clean清理
gulp.task('clean', () =>
  gulp.src(['build/project/**/html/', 'build/project/**/images/', 'build/project/**/css/', 'build/project/**/js'], {
    read : false
  }).pipe(clean()));

// watch监测
// 监控HTML、SCSS、Images和Javascript文件的修改，自动进行文件编译
gulp.task('watch', () => {
	gulp.watch('src/project/**/*.html', ['html']);
	gulp.watch('src/project/**/images/*', ['images', 'scss']);
	gulp.watch('src/project/**/css/*.scss', ['scss']);
	gulp.watch('src/project/**/js/*.js', ['scripts']);

	livereload.listen();
});

// default
// 默认执行开发模式
gulp.task('default', ['clean'], () => {
	gulp.start('connect', 'html', 'images', 'scss', 'scripts', 'watch');
});
