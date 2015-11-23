'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');

function errorOutput(task) {

	return function(err) {
		gutil.log(gutil.colors.bgRed(task + ' error:'), gutil.colors.red(err));
		// Emit end to this task streams so that we don't block
		// other following tasks
		this.emit('end');
	}

}


module.exports = errorOutput;

