'use strict';

/**
 * 对 controller 进行异常捕捉
 * @param {any} params
 * @return params
 */
module.exports = function (params) {
  if (typeof params === 'function') {
    return catchError(params);
  }
  if (typeof params === 'object') {
    for (const key in params) {
      if (typeof params[key] === 'function') {
        params[key] = catchError(params[key]);
      }
    }
  }
  return params;
};

/**
 * 处理错误
 * @param {function} controller
 * @returns {function}
 */
function catchError(controller) {
  return function (req, res, next) {
    const func = controller.apply(null, arguments);
    if (func && typeof func.then === 'function') {
      return func.catch((err) => {
        return next({code: 500, msg: err.message || err, err: err});
      });
    }
    return func;
  };
}
