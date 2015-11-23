'use strict';

var config = require('./config')
	, requireDir = require('require-dir');

// Load all tasks
var tasks = requireDir('./tasks');