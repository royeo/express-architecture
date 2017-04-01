'use strict';

const Redis = require('iosredis');

module.exports = {
  cache: new Cache({redis: config.redis})
};

/**
 * 缓存类
 * @param {any} options
 * @constructor
 */
function Cache(options) {
  this._client = new Redis(options.redis);
}

/**
 * @param key
 * @param content
 * @param expire
 * @return {Promise.<TResult>}
 */
Cache.prototype.set = function (key, content, expire) {
  return this._client.set(key, JSON.stringify(content || '')).then(() => {
    if (expire) {
      return this._client.expire(key, expire);
    } else {
      return null;
    }
  });
};

Cache.prototype.get = function (key, fun, expire, refresh) {
  return this._client.get(key).then(detail => {
    if (!refresh && detail) {
      return JSON.parse(detail);
    } else {
      if (typeof fun === 'function') {
        return fun().then(content => {
          this.set(key, content, expire).finnally(() => content);
        });
      } else {
        return null;
      }
    }
  });
};
