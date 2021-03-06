var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var cssmin = require('gulp-cssmin');
var concat = require('gulp-concat');
var zip = require('gulp-zip');
var unzip = require('gulp-unzip');
var fs = require('fs');
var mkdirp = require('mkdirp');
var chalk = require('chalk');
var watch = require('gulp-watch');

const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);

//Chalk colors
var error = chalk.bold.red;
var success = chalk.green;
var regular = chalk.white;

gulp.task('watch', (done) => {
	gulp.watch('./src/js/**/*.js', gulp.series('build-js', 'zip', 'check'));
	gulp.watch('./src/html/**/*.html', gulp.series('build-html', 'check'));
	gulp.watch('./src/css/**/*.css', gulp.series('build-css', 'check'));
	gulp.watch('./src/assets/**/*', gulp.series('build-assets', 'check'));
});

gulp.task('init', (done) => {
	//Create our directory structure
	mkdirp('./src', function (err) {
		mkdirp('./src/js', function (err) {
			mkdirp('./src/html', function (err) {
				mkdirp('./src/css', function (err) {
					mkdirp('./src/assets', function (err) {
						mkdirp('./live', function(){
							done();
							}
						);
					});
				});
			});
		});
	});
});

gulp.task('unzip', function(){
	gulp.src("./download/bootstrap-3.1.1-dist.zip")
		.pipe(unzip())
		.pipe(gulp.dest('./tmp'))
})

gulp.task('build-js', (done) => {
	return gulp.src([
			'./src/js/Engine/Game.js',
			'./src/js/Engine/System.js',
			'./src/js/Engine/Input.js',
			'./src/js/Engine/Entity.js',
			'./src/js/Game/Entities/*.js',
			'./src/js/Game/*.js'
		])
		.pipe(concat('game.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./build/'))
});

gulp.task('build-html', (done) => {
	return gulp.src('./src/html/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build/'));
});

gulp.task('build-css', (done) => {
	return gulp.src('./src/css/**/*.css')
		.pipe(cssmin())
		.pipe(gulp.dest('./build/'));
});

gulp.task('build-assets', (done) => {
	return gulp.src('./src/assets/**/*')
		.pipe(gulp.dest('./build/'));
});

gulp.task('zip', (done) => {
	return gulp.src('./build/**/*')
		.pipe(zip('entry.zip')) //gulp-zip performs compression by default
		.pipe(gulp.dest('dist'));
});

gulp.task('check', gulp.series('zip', (done) => {
	var stats = fs.statSync("./dist/entry.zip")
	var fileSize = stats.size;
if (fileSize > 13312) {
	console.log(error("Your zip compressed game is larger than 13kb (13312 bytes)!"))
	console.log(regular("Your zip compressed game is " + fileSize + " bytes"));
} else {
	console.log(success("Your zip compressed game is " + fileSize + " bytes."));
}
done();
}));

gulp.task('build', gulp.series('build-html', 'build-js', 'build-assets', 'check', (done) => {
	done();
}));