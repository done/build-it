'use strict';

var path = require('path')
	, production = (process.env.NODE_ENV === 'production');

/**
 * Configuration
 * 
 */
var config = {
	production : production,
	bowerDir: 'bower_components',
	dist: production ? 'dist' : '.tmp',
	livereloadPort: 35729,
	port: process.env.PORT || 9000,
	root: path.resolve('./'),
	watch : false
};

/**
 * Images
 * 
 */

config.images = {
	input : {
		dir: 'app/images'
	},
	output : {
		dir: 'images'
	},
	imageMinOptions : {
		
	}
}

/**
 * Scripts
 * 
 */
config.scripts = {
	input : {
		dir: 'app/scripts',
		name: 'app.js'
	},
	output : {
		dir: 'scripts',
		name: 'bundle.js'	
	}
	
};

/**
 * Styles
 * 
 */
config.styles = {
	includePaths: [
		
	],
	input: {
		dir: 'app/sass',
		name: 'main.scss'
	},
	output : {
		dir: 'styles',
		name: 'main.css'
	}
};

/**
 * Aliasify
 * 
 */
config.aliasify = {

	aliases: {
		'app' : '../app/scripts',
		'templates' : '../app/jade/templates',
		'lib' : '../app/scripts/vendor'
	},
	configDir: __dirname,
	verbose : false

};

/**
 * Jadeify
 * 
 */
config.jadeify = {

	compileDebug: true,
	pretty: true

};

/**
 * Browser sync
 * 
 */
config.browserSyncServerName = 'server';
// For options please visit: 
// http://www.browsersync.io/docs/options/
config.browserSyncOptions = {
	server : {
		baseDir : config.dist
	},
	port : config.port,
	open: false
};

/**
 * Exports
 * 
 */
module.exports = config;