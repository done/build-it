'use strict';

var config = require('../config')
	, path = require('path')
	, gulp = require('gulp')
	, changed = require('gulp-changed')
	, size = require('gulp-size')
	, error = require('../error')
	, svgstore = require('gulp-svgstore')
	, rename = require('gulp-rename')
	, imagemin = require('gulp-imagemin');


gulp.task('images', function(){

	var dest = config.dist + '/' + config.images.output.dir;

	var stream = gulp.src([config.images.input.dir + '/**/*', '!' + config.images.input.dir + '/{svg,svg/**}'])
		.pipe(changed(dest)) // Ignore unchanged files
		.pipe(imagemin()) // Optimize
		.on('error', error('IMAGE MIN'))
		.pipe(gulp.dest(dest));

	return stream;

});

gulp.task('svg', function(){

	var dest = config.dist + '/' + config.images.output.dir;

	var stream = gulp.src(config.images.input.dir + '/svg/**/*')
		//.pipe(imagemin()) // Optimize
		.pipe(svgstore())
		.on('error', error('SVG STORE'))
		.pipe(rename('icons.svg'))
		.pipe(gulp.dest(dest));

});