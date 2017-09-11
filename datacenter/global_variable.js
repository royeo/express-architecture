'use strict';

global.fs   = require('fs');
global.path = require('path');

global._       = require('lodash');
global.config  = require('config');
global.Promise = require('bluebird');

global.db          = require('./models');
global.cache       = require('./lib/cache/cache');
global.logger      = require('./tools/logger');
global.handleError = require('./middlewares/error-handle');
