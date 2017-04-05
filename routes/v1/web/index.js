'use strict';

module.exports = function (router) {
  router.get('/', (req, res) => {
    res.send('index');
  });
};
