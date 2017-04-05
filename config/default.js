'use strict';

const pkg = require('../package.json');

module.exports = {
  web: {
    url: 'http://127.0.0.1:5555',
    host: '127.0.0.1',
    port: 5555,
    name: pkg.name
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  log: {
    dir            : '../logs',
    nolog          : /\.(js|css|png|jpg|jpeg|ico|svg|gif)/,
    format         : ':remote-addr :method :url :status :response-time ms :user-agent :content-length',
    replaceConsole : true,
    level          : 'AUTO',
    console        : true
  }
};
