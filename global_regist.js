'use strict';

global.ROOT_PATH = __dirname;
global.path = require('path');

global.config = require('config');
global.Promise = require('bluebird');

global.logger = require('./tools/logger');
global.cache = require('./lib/cache/cacheClass');


