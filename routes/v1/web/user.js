'use strict';

module.exports = function (router) {
  router.get('/user', (req, res) => {
    res.send('user');
  });
};
