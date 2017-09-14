'use strict';

const Redis = require('ioredis');

const redis = new Redis(config.redis);

module.exports = {
  set,
  get,
  incr,

  hset,
  hget,
  hdel,
  hincr,

  sadd,
  spop,
  srem,
  sismember,

  zrank,
  zrange,
  zcount,
  zadd,
  zcard,
  zrem,
  zremrangebyscore,

  del,
  ttl,

  flushdb,

  genKey
};

async function set(key, value, expire) {
  value = JSON.stringify(value);
  await redis.set(key, value);
  await setExpire(key, expire);
}

async function get(key, func, expire, refresh) {
  const value = await redis.get(key);
  if (value && !refresh) {
    return JSON.parse(value);
  } else {
    return getCacheFromFunc(key, func, expire);
  }
}

function incr(key, value = 1) {
  return redis.incrby(key, value);
}

async function hset(key, field, value, expire) {
  value = JSON.stringify(value);
  await redis.hset(key, field, value);
  await setExpire(key, expire);
}

async function hget(key, field, func, expire, refresh) {
  const value = await redis.hget(key, field);
  if (value && !refresh) {
    return JSON.parse(value);
  } else {
    return getCacheFromFunc({key, field}, func, expire);
  }
}

function hdel(key, field) {
  return redis.hdel(key, field);
}

function hincr(key, field, value = 1) {
  return redis.hincrby(key, field, value);
}

async function sadd(key, member, expire) {
  await redis.sadd(key, member);
  await setExpire(key, expire);
}

function sismember(key, member) {
  return redis.sismember(key, member);
}

function spop(key) {
  return redis.spop(key);
}

function srem(key, member) {
  return redis.srem(key, member);
}

async function zrank(key, member, func) {
  await getMemberIfEmpty(key, func);
  return redis.zrank(key, member);
}

async function zrange(key, start, end, func) {
  await getMemberIfEmpty(key, func);
  return redis.zrange(key, start, end);
}

function zcount(key, min, max) {
  return redis.zcount(key, min, max);
}

function zremrangebyscore(key, min, max) {
  return redis.zremrangebyscore(key, min, max);
}

function zadd(key, [score, member]) {
  return redis.zadd(key, [score, member]);
}

function zcard(key) {
  return redis.zcard(key);
}

function zrem(key, member) {
  return redis.zrem(key, member);
}

function ttl(key) {
  return redis.ttl(key);
}

function del(key) {
  return redis.del(key);
}

function flushdb() {
  return redis.flushdb();
}

function genKey() {
  return Array.from(arguments).join(':');
}

async function getMemberIfEmpty(key, func) {
  if (_.isFunction(func) && (await isZsetEmpty(key))) {
    return getMemberFromFunc(key, func);
  }
}

async function isZsetEmpty(key) {
  return !(await zcard(key));
}

async function getMemberFromFunc(key, func) {
  const result = await func();
  for (const [score, member] of result) {
    await zadd(key, [score, member]);
  }
}

function setExpire(key, expire) {
  if (Number.isInteger(expire)) {
    return redis.expire(key, expire);
  }
}

function getCacheFromFunc(key, func, expire) {
  if (_.isFunction(func)) {
    return execFuncForCache(key, func, expire);
  } else {
    return noCache();
  }
}

async function execFuncForCache(key, func, expire) {
  const value = await func();
  await setCache(key, value, expire);
  return value;
}

async function setCache(key, value, expire) {
  if (_.isObject(key)) {
    await hset(key.key, key.field, value, expire);
  } else {
    await set(key, value, expire);
  }
}

function noCache() {
  return null;
}
