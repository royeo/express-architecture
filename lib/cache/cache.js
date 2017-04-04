'use strict';

const Redis = require('ioredis');

module.exports = new Cache({redis: config.redis});

/**
 * 缓存类
 * @param {any} options
 * @constructor
 */
function Cache(options) {
  this._client = new Redis(options.redis);
}

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
          this.set(key, content, expire).finally(() => content);
        });
      } else {
        return null;
      }
    }
  });
};

Cache.prototype.hset = function (key, field, content, expire) {
  return this._client.hset(key, field, JSON.stringify(content || '')).then(() => {
    if (expire) {
      return this._client.expire(key, expire);
    } else {
      return null;
    }
  });
};

Cache.prototype.hget = function (key, field, func, expire, refresh) {
  return this._client.hget(key, field).then(detail => {
    if (!refresh && detail) {
      return JSON.parse(detail);
    } else {
      if (typeof func === 'function') {
        return func().then(content => {
          this.hset(key, field, content, expire);
          return content;
        });
      } else {
        return null;
      }
    }
  });
};

Cache.prototype.del = function (key) {
  return this._client.del(key);
};

