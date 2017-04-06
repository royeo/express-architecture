'use strict';

const admin = require('../../../controllers/admin');

module.exports = function (router) {
  router.get('/', admin.index);
  router.get('/detail', admin.detail);
};
