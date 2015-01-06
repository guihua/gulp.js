var gulp = require('gulp'),  
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    gif = require('gulp-if'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    include = require('gulp-include'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload');

gulp.task('connect', function () {
  connect.server({
    root: 'project',
    port: 8989,
    livereload: true
  });
});

gulp.task('html', function() {
	gulp.src('project/**/*.html')
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
	    		message: 'Scripts task complete'
	    	}));
});

gulp.task('images', function() {
	return gulp.src('src/project/**/images/*')
		.pipe(imagemin({
			optimizationLevel: 3,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('project'));
});

gulp.task('clean', function() {  
  return gulp.src(['project/**/styles', 'project/**/images', 'project/**/scripts'], {
  		read: false
  	}).pipe(clean());
});
 
gulp.task('default', ['clean'], function() {  
    gulp.start('styles', 'connect', 'images', 'scripts', 'watch');
});

gulp.task('watch', function() {
	gulp.watch('project/**/*.html', ['html']);
	
	gulp.watch('src/project/**/styles/*.scss', ['styles']);
	gulp.watch('src/project/**/images/*', ['images']);
	gulp.watch('src/project/**/scripts/*.js', ['scripts']);

	livereload.listen();
});