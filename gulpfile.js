var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var serve = require('gulp-serve');
var rollup = require('gulp-rollup');

//
// === Tasks ===
//
 
gulp.task('serve', serve(['build']));

gulp.task('html', function() {
	return gulp.src('public/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.on('error', console.log)
		.pipe(gulp.dest('build'));
});

gulp.task('content', function() {
	return gulp.src(['./public/**/*', '!./public/**/*.html'])
		.pipe(gulp.dest('./build'));
});

gulp.task('js', () => {
	return gulp.src('./src/**/*.js')
		.pipe(rollup({
			entry: './src/app.js',
			format: 'es'
		}))
		.pipe(babel())
		.pipe(uglify())
		.on('error', console.log)
		.pipe(gulp.dest('./build/assets'));
});
 
gulp.task('sass', function() {
	return gulp.src('./src/styles/app.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.on('error', console.log)
		.pipe(gulp.dest('./build/assets'));
});

//
// === Watch ===
//

gulp.task('html:watch', function() {
	gulp.watch('./public/**/*.html', ['html']);
});

gulp.task('content:watch', function() {
	gulp.watch('./public/**/*', ['content']);
});

gulp.task('js:watch', function() {
	gulp.watch('./src/**/*.js', ['js']);
});
 
gulp.task('sass:watch', function() {
	gulp.watch('./src/**/*.scss', ['sass']);
});

// Public Tasks

gulp.task('deploy', function() {
	return gulp.src(['./build/**/*', './CNAME'])
	.pipe(ghPages());
});

gulp.task('default', ['html', 'content', 'js', 'sass']);
gulp.task('watch', [
	'serve',
	'html:watch',
	'content:watch',
	'js:watch',
	'sass:watch'
]);