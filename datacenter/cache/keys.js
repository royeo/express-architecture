'use strict';

const ONE_MINUTE = 60;
const ONE_DAY    = 60 * 60 * 24;
const ONE_WEEK   = 60 * 60 * 24 * 7;

module.exports = {
  token      : {key: 'token', expire: ONE_MINUTE},
  userInfo   : {key: 'userInfo', expire: ONE_DAY},
  userAddress: {key: 'userAddress', expire: ONE_WEEK}
};
