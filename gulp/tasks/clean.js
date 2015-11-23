'use strict';

var config = require('../config')
	, gulp = require('gulp')
	, del = require('del')
	, vinylPaths = require('vinyl-paths');

gulp.task('clean', function(cb){

	return del([config.dist + '/**/*'], cb);

});