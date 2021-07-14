const gulp = require('gulp'),
    sass = require('gulp-sass'),
 	cleanCSS = require('gulp-clean-css'),
	autoprefixer = require('gulp-autoprefixer'),
	rename = require("gulp-rename"),
	browserSync = require('browser-sync');

gulp.task('sass', function(){ // Создаем таск Sass
	return gulp.src('src/sass/**/*.sass') // Берем источник
		.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(rename({suffix: '.min', prefix: ''}))
		.pipe(autoprefixer())
		.pipe(cleanCSS({compatibility: 'ie8'}))
		.pipe(gulp.dest('src/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.stream()); // Обновляем CSS на странице при изменении
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel('sass'));
});

gulp.task('browser-sync', function() { 
	browserSync({ 
		server: {
			baseDir: 'src'
		},
		notify: false
	});
	gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel('sass', 'browser-sync', 'watch'));