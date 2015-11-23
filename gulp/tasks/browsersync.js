'use strict';

var config = require('../config')
	, gulp = require('gulp')
	, browserSync = require('browser-sync').create(config.browserSyncServerName);

gulp.task('browser-sync', function(){

	browserSync.init(config.browserSyncOptions);

});

// TODO: Add check for if a task exists or not

gulp.task('reload-sass', ['sass'], function(){
	browserSync.reload();
});

gulp.task('reload-browserify', ['browserify'], function(){
	browserSync.reload();
});

gulp.task('reload-jade', ['jade'], function(){
	browserSync.reload();
});

gulp.task('reload-images', ['images'], function(){
	browserSync.reload();
});