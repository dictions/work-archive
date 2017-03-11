var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var serve = require('gulp-serve');
 
gulp.task('serve', serve(['build']));

gulp.task('html', function() {
	return gulp.src('public/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('svg', function() {
	return gulp.src('public/**/*.svg')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('build'));
});

gulp.task('js', () => {
	return gulp.src('src/index.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest('./build/assets'));
});
 
gulp.task('sass', function () {
	return gulp.src('./src/styles/index.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(gulp.dest('./build/assets'));
});

gulp.task('html:watch', function () {
	gulp.watch('./public/**/*.html', ['html']);
});

gulp.task('svg:watch', function () {
	gulp.watch('./public/**/*.svg', ['svg']);
});

gulp.task('js:watch', function () {
	gulp.watch('./src/**/*.js', ['js']);
});
 
gulp.task('sass:watch', function () {
	gulp.watch('./src/**/*.scss', ['sass']);
});

gulp.task('deploy', function() {
	return gulp.src(['./build/**/*', './CNAME'])
	.pipe(ghPages());
});

gulp.task('default', ['html', 'svg', 'js', 'sass']);
gulp.task('watch', ['serve', 'js:watch', 'sass:watch', 'html:watch', 'svg:watch',]);