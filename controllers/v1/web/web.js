'use strict';

module.exports = {
  index,
  detail,
  getEnv
};

function index(req, res, next) {
  return next({code: 200, ext: "It's is Index."});
}

function detail(req, res, next) {
  return next({code: 200, ext: "It's is Detail."});
}

function getEnv(req, res, next) {
  return next({code: 200, ext: process.env.NODE_ENV});
}
