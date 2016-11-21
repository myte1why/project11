'use strict';

var gulp 	= require('gulp'),
	concat 	= require('gulp-concat'),
	ugly	= require('gulp-uglify'),
	rename	= require('gulp-rename'),
	sass	= require('gulp-sass'),
	map		= require('gulp-sourcemaps'),
	del 	= require('del');



gulp.task('concatScripts',function(){
	return gulp.src([	'js/jquery.js',
				'js/fastclick.js',
				'js/foundation.js',
				'js/foundation.equalizer.js',
				'js/foundation.reveal.js'])
	.pipe(map.init())
	.pipe(concat('app.js'))
	.pipe(map.write('./'))
	.pipe(gulp.dest('js'));
});

gulp.task('minifyJs', ['concatScripts'] ,function(){
	return gulp.src('js/app.js')
	.pipe(ugly())
	.pipe(rename('app.min.js'))
	.pipe(gulp.dest('js'));
});

gulp.task('sassWorker',function(){
	return gulp.src('scss/main.scss')
	.pipe(map.init())
	.pipe(sass({outputStyle: 'compressed'}))
	.pipe(map.write('./'))
	.pipe(gulp.dest('css'));
});

gulp.task('watchTask',function(){
	gulp.watch(['scss/**/*.scss'],['sassWorker']);
})

gulp.task('clean',function(){
	del(['dist','css/main.css*','js/app*.js*']);
})

gulp.task('build',['minifyJs','sassWorker'],function(){
	return gulp.src(['css/main.css','js/app.min.js','index.html','img/**'],{base: './'})
	.pipe(gulp.dest('dist'));
});

gulp.task('default', ['clean'] , function(){
	gulp.start('build');
});