'use strict';

let express = require('express');
let router = express.Router();
let cache = require('../lib/cache/cache');

/* GET home page. */
router.get('/', function (req, res, next) {
  cache.get('key').then(result => {
    if (result) {
      res.send('welcome again');
    } else {
      cache.set('key', 'value', 10).then(() => {
        res.send('welcome first');
      });
    }
  }).catch((err) => {
    console.log(err.message);
  });
});

module.exports = router;
