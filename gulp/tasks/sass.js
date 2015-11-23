'use strict';

var config = require('../config')
	, through = require('through2')
	, gulp = require('gulp')
	, sass = require('gulp-sass')
	, size = require('gulp-size')
	, csso = require('gulp-csso')
	, gulpif = require('gulp-if')
	, gutil = require('gulp-util')
	, sourcemaps = require('gulp-sourcemaps')
	, postcss = require('gulp-postcss')
	, autoprefixer = require('autoprefixer')
	, error = require('../error');

gulp.task('sass', function(){

	var production = config.production;
	var stream = gulp.src(config.styles.input.dir + '/' + config.styles.input.name)
		// Initialize source maps if not in production
		.pipe(gulpif(!production, sourcemaps.init()))
		// Sass
		.pipe(sass({
			errLogToConsole: true,
			sourceComments: !production,
			outputStyle: production ? 'compressed' : 'nested',
			includePaths: config.styles.includePaths
		}))
		.on('error', error('SASS'))
		// Generate maps if not in production
		.pipe(gulpif(!production, sourcemaps.write({
			'includeContent' : false,
			'sourceRoot' : '../maps'
		})))
		.pipe(gulpif(production, csso()))
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
		// The name will be the same as the input file
		.pipe(gulp.dest(config.dist + '/' + config.styles.output.dir))
		// Output the size
		.pipe(size());

	return stream;
});