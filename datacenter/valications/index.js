'use strict';

/* eslint-disable */

module.exports = fs
  .readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .reduce((mods, file) => {
    return Object.assign(mods, require(path.join(__dirname, file)));
  }, {});
