'use strict';

var gulp = require('gulp')
	, gutil = require('gulp-util')
	, runSequence = require('run-sequence');

gulp.task('build', function(done){
	
	runSequence('clean', ['jade', 'sass', 'jshint', 'svg', 'images', 'vendor', 'browserify'], done);

});