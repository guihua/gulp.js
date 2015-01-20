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

gulp.task('connect', function() {
	connect.server({
		root: 'project',
		port: 8989,
		livereload: true
	});
});

gulp.task('html', function() {
	return gulp.src('src/project/**/*.html')
		.pipe(gulp.dest('project'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Html task complete'
		}));
});

gulp.task('styles', function() {
	return gulp.src('src/project/**/styles/*.scss')
		.pipe(sass({
			style : 'expanded'
		}))
		.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
		.pipe(minifycss())
		.pipe(gulp.dest('project'))
		.pipe(cssBase64({
			baseDir: "../images"
		}))
		.pipe(gulp.dest('project'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Styles task complete'
		}));
});

gulp.task('scripts', function() {
	return gulp.src('src/project/**/scripts/*.js')
		.pipe(include())
		.pipe(jshint())
		.pipe(uglify())
		.pipe(gulp.dest('project'))
		.pipe(livereload())
		.pipe(notify({
			message : 'Scripts task complete'
		}));
});

gulp.task('clean', function() {
	return gulp.src(['project/**/styles/', 'project/**/images/', 'project/**/scripts'], {
			read : false
		}).pipe(clean());
});

gulp.task('default', ['clean'], function() {
	gulp.start('connect', 'html', 'styles', 'scripts', 'watch');
});

gulp.task('watch', function() {
	gulp.watch('src/project/**/*.html', ['html']);
	gulp.watch('src/project/**/styles/*.scss', ['styles']);
	gulp.watch('src/project/**/scripts/*.js', ['scripts']);

	livereload.listen();
}); 