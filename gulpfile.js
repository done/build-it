'use strict';

/**
 * Rather than manage one giant configuration file responsible
 * for creating multiple tasks, each task has been broken out into
 * its own file in gulp/tasks. Any file in that folder gets automatically
 * required in ./gulp/index.js (required below).

 * To add a new task, simply add a new task file to gulp/tasks.
 */

require('./gulp');
