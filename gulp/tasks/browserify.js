'use strict';

var config = require('../config')
	, gulp = require('gulp')
	, source = require('vinyl-source-stream')
	, buffer = require('vinyl-buffer')
	, browserify = require('browserify')
	, through = require('through2')
	, gutil = require('gulp-util')
	, uglify = require('gulp-uglify')
	, globby = require('globby')
	, sourcemaps = require('gulp-sourcemaps')
	, size = require('gulp-size')
	, aliasify = require('aliasify')
	, jadeify = require('jadeify')
	, watchify = require('watchify')
	, assign = require('lodash').assign
	, error = require('../error')
	, concat = require('gulp-concat-vendor')
	, gulpif = require('gulp-if');

/**
 * Gulp task
 * 
 */
gulp.task('browserify', bundle);

// Vendor
gulp.task('vendor', function() {

	var stream = gulp.src(config.scripts.input.dir + '/' + '/vendor/**/*.js' )
		.pipe(concat('vendor.js'))
		.pipe(uglify())
			.on('error', gutil.log)
		.pipe(gulp.dest(config.dist + '/' + config.scripts.output.dir + '/'));

	return stream;
});

/**
 * Browserify and watchify initialization
 * 
 */
var b,
	opts,
	// Custom Browserify options
	customOpts = {
		entries : [config.scripts.input.dir + '/' + config.scripts.input.name],
		debug : !config.production
	};

if ( config.watch ) {

	opts = assign({}, watchify.args, customOpts);
	b = watchify(browserify(opts));

} else {

	opts = assign({}, { cache: {}, packageCache: {}, fullPaths: false }, customOpts);
	b = browserify(opts);

}

/**
 * Transforms
 * 
 */

b.transform(aliasify, config.aliasify);

if ( !!config.jadeify ) {
	b.transform(jadeify, config.jadeify);
}

// TODO: 
// bundler.transform(babelify.configure({
//     sourceMapRelative: 'app/scripts'
// }));

/**
 * Browserify listeners
 * 
 */
b.on('update', bundle);
b.on('log', gutil.log);

/**
 * Bundle method
 * 
 */
function bundle(){

	var bundledStream = through()
		, browserSync = require('browser-sync').get(config.browserSyncServerName)

	// TODO: Strip debug - gulp-strip-debug

	bundledStream
		.on('error', function(err) {
			gutil.log(err.message);
			browserSync.notify('Browserify Error!');
			this.emit('end');
		})

		// Our output file
		.pipe(source(config.scripts.output.name))
		// Add support for streams (like the gulp-streamify)
		.pipe(buffer())
		// Initialize source maps
		.pipe(gulpif(!production, sourcemaps.init({loadMaps: true})))
		// Uglify the source
		.pipe(uglify())
			.on('error', gutil.log)
		// Create our source maps file
		.pipe(gulpif(!production, sourcemaps.write('./')))
		// Output destination
		.pipe(gulp.dest(config.dist + '/' + config.scripts.output.dir))
		// Size output
		.pipe(size());

	if ( config.watch ) {
		bundledStream.pipe(browserSync.stream({once: true}));
	}

	b.bundle().pipe(bundledStream);
	return bundledStream;

}

