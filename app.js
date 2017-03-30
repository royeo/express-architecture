'use strict';

require('./global_regist');
const web = require('./servers/web');

Promise.resolve([web]).each((app) => {
  app.start();
});