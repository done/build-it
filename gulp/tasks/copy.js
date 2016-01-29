'use strict';

var config = require('../config')
	, through = require('through2')
	, gulp = require('gulp')
	, gutil = require('gulp-util');

gulp.task('copy', function(cb){

	var merged = require('merge-stream')();

	// Loop through our copy object
	config.copy.files.map(function(item){

		var stream = gulp.src(item.input)
						.pipe(gulp.dest(config.dist + '/' + item.output ));

		merged.add(stream);

	});

	return merged;

});