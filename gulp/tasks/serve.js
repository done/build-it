'use strict';

var config = require('../config');
var gulp = require('gulp');
var gutil = require('gulp-util');
var serveStatic = require('serve-static');
var serveIndex = require('serve-index')

// NOT used
gulp.task('connect', function(){

	console.log('connecting...' + config.dist);
	var connect = require('connect');
	
	var app = connect()
		.use(require('connect-livereload')({ port: config.livereloadPort }))
		.use('/', serveStatic(config.dist))
		.use('/', serveStatic('app'))
		// // Paths to bower_components should be relative to the current file
		// // e.g. in app/index.html you should use ../bower_components, unless
		// // you have set another bower_components path.
		.use(config.bowerDir, serveStatic(config.bowerDir))
		.use(serveIndex('app'));

	require('http').createServer(app)
		.listen(config.port)
		.on('listening', function(){
			gutil.log('Started connect web server on http://localhost:' + config.port);
	});

});

gulp.task('serve', function(){
	require('opn')('http://localhost:' + config.port);
});