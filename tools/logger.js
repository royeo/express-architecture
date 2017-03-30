const fse = require('fs-extra');
const log4js = require('log4js');

fse.mkdirsSync(config.log.dir);
fse.mkdirsSync(config.log.dir + '/main');

const log4jsConfig = {
  replaceConsole: config.log.replaceConsole,
  level: config.log.level,
  appenders: [
    {
      type: "console"
    },
    {
      type: 'dateFile',
      filename: path.join(config.log.dir, 'main/'),
      pattern: 'yyyyMMdd',
      alwaysIncludePattern: true,
      category: 'main',
      maxLogSize: 20480,
      backups: 3
    }, 
    {
      type: 'logLevelFilter',
      level: 'ERROR',
      category: 'main',
      appender: {
        type: 'file',
        filename: path.join(config.log.dir, 'main.error'),
        maxLogSize: 20480
      }
    }
  ]
};

log4js.configure(log4jsConfig);
var logger = log4js.getLogger('main');
logger.setLevel('AUTO');
logger.log4js = log4js;

module.exports = logger;