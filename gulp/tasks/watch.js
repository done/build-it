'use strict';

var config = require('../config')
	, gulp = require('gulp');


gulp.task('watch', ['browser-sync', 'build'], function(){

	// Watch for changes in 'app' folder
	gulp.watch([
		config.dist + '/**/*'
	]);

	// Sass files
	gulp.watch('app/sass/**/*', ['reload-sass']);

	// Js files
	gulp.watch('app/scripts/**/*', ['jshint', 'reload-browserify']);

	// Image files
	gulp.watch('app/images/**/*', ['reload-images']);
	
	// Jade files
	gulp.watch('app/jade/**/*.jade', ['reload-jade']);

});