'use strict';

var config = require('../config');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var gulpif = require('gulp-if');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var through = require('through2');
var gutil = require('gulp-util');

/**
 * Gulp task
 * 
 */
gulp.task('jshint', function(){

	return gulp.src(config.scripts.input.dir + '/**/*.js')
		.on('error', gutil.log.bind(gutil, 'Jshint Error'))
		.pipe(jshint('.jshintrc'))
		.pipe(jshint.reporter(stylish));

});