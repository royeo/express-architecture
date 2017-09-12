'use strict';

const fse    = require('fs-extra');
const log4js = require('log4js');

/* eslint-disable */
fse.mkdirsSync(config.log.dir);
fse.mkdirsSync(config.log.dir + '/main');
/* eslint-enable */

const log4jsConfig = {
  replaceConsole: config.log.replaceConsole,
  level: config.log.level,
  appenders: [
    {
      category: 'main',
      type: 'dateFile',
      filename: path.join(config.log.dir, 'main/'),
      pattern: 'yyyyMMdd',
      alwaysIncludePattern: true,
      maxLogSize: 1024 * 1024 * 30,
      backups: 3
    },
    {
      category: 'main',
      type: 'logLevelFilter',
      level: 'WARN',
      appender: {
        type: 'file',
        filename: path.join(config.log.dir, 'main.warn'),
        maxLogSize: 1024 * 1024 * 30
      }
    },
    {
      category: 'main',
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: {
        type: 'file',
        filename: path.join(config.log.dir, 'main.error'),
        maxLogSize: 1024 * 1024 * 30
      }
    }
  ]
};

if (config.log.console) {
  log4jsConfig.appenders.push({
    type: 'console'
  });
}

log4js.configure(log4jsConfig);

const mainLogger = log4js.getLogger('main');

mainLogger.setLevel(config.log.level);
mainLogger.log4js = log4js;

module.exports = mainLogger;
