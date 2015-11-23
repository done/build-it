'use strict';

var config = require('../config')
	, gulp = require('gulp')
	, jade = require('gulp-jade')
	, size = require('gulp-size')
	, error = require('../error');

 // Jade
gulp.task('jade', function () {
	return gulp.src('app/jade/**/*.jade')
		.pipe(jade())
		.on('error', error('JADE'))
		.pipe(gulp.dest(config.dist))
		.pipe(size());
});
