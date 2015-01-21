/*******************************************
 * Gulp编译配置文件
 * 
 * @author guihua.pgh
 * @date 20150120
 *******************************************/

// require all plugins
var gulp = require('gulp'),
	autoprefixer = require('gulp-autoprefixer'),
	cache = require('gulp-cache'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	connect = require('gulp-connect'),
	cssBase64 = require('gulp-css-base64'),
	gif = require('gulp-if'),
	include = require('gulp-include'),
	jshint = require('gulp-jshint'),
	livereload = require('gulp-livereload'),
	minifycss = require('gulp-minify-css'),
	notify = require('gulp-notify'),
	rename = require('gulp-rename'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify');

/*******************************************
 * 建立本地服务
 * 默认为localhost，或者本地IP地址
 * @params：
 * 		root——指定根目录
 * 		port——指定访问端口，避免被占用引起冲突
 * 		livereload——根目录下文件改变时，自动刷新
 *******************************************/
gulp.task('connect', function() {
	connect.server({
		root: 'build',
		port: 8989,
		livereload: true
	});

	// 增加本地静态页面浏览机制
	// 1.html模板
	// 2.引入同名JS和CSS文件
});

/*******************************************
 * html任务
 *******************************************/
gulp.task('html', function() {
	return gulp.src('src/project/**/html/*.html')
		.pipe(gulp.dest('build'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Html task complete'
		}));
});

/*******************************************
 * images任务
 *******************************************/
gulp.task('images', function() {
	return gulp.src('src/project/**/images/*')
		.pipe(gulp.dest('build'))
		.pipe(livereload())
		.pipe(notify({
			message : 'images task complete'
		}));
})

/*******************************************
 * scss任务
 * 1.SCSS文件编译成CSS
 * 2.压缩CSS
 * 3.images to base64
 *******************************************/
gulp.task('scss', function() {
	return gulp.src('src/project/**/css/*.scss')
		.pipe(sass({
			style : 'expanded'
		})) // SCSS编译
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss()) // CSS压缩
		.pipe(gulp.dest('build'))
		.pipe(cssBase64({
			baseDir: "../images",
			maxWeightResource: "15360" // 设置上限为15KB，最大允许图片32KB-32768B
		})) // 图片base64位转化
		.pipe(gulp.dest('build'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Scss task complete'
		}));
});

/*******************************************
 * scripts任务
 * 1.合并include引入的js文件
 * 2.js语法检查
 * 3.js压缩
 *******************************************/
gulp.task('scripts', function() {
	return gulp.src('src/project/**/js/*.js')
		.pipe(include()) // 合并以‘//= include path/to/xx.js’格式引入的js文件，或者‘#= require_tree path/to/folder’格式引入的文件夹，include关键字可以换成require
		.pipe(jshint()) // js语法检查
		.pipe(uglify()) // js压缩混淆
		.pipe(gulp.dest('build'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Scripts task complete'
		}));
});

/*******************************************
 * clean清理
 *******************************************/
gulp.task('clean', function() {
	return gulp.src(['build/**/html/', 'build/**/images/', 'build/**/css/', 'build/**/js'], {
			read : false
		}).pipe(clean());
});

/*******************************************
 * watch监测
 * 监控HTML、SCSS、Images和Javascript文件的修改，自动进行文件编译
 *******************************************/
gulp.task('watch', function() {
	gulp.watch('src/project/**/*.html', ['html']);
	gulp.watch('src/project/**/images/*', ['images', 'scss']);
	gulp.watch('src/project/**/css/*.scss', ['scss']);
	gulp.watch('src/project/**/js/*.js', ['scripts']);

	livereload.listen();
});

/*******************************************
 * default
 * 默认执行开发模式
 *******************************************/
gulp.task('default', ['clean'], function() {
	gulp.start('connect', 'html', 'images', 'scss', 'scripts', 'watch');
});