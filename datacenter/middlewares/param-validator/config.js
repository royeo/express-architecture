'use strict';

// 自定义验证方法
const customValidators = {
  isArray(value) {
    try {
      return Array.isArray((typeof value === 'string') ? JSON.parse(value) : value);
    } catch (e) {
      return false;
    }
  },
  isIntArray(value) {
    try {
      value = (typeof value === 'string') ? JSON.parse(value) : value;
      return Array.isArray(value) && value.every(item => Number.isInteger(_.toInteger(item)));
    } catch (e) {
      return false;
    }
  },
  isStringArray(value) {
    try {
      value = (typeof value === 'string') ? JSON.parse(value) : value;
      return Array.isArray(value) && value.every(_.isString);
    } catch (e) {
      return false;
    }
  },
  isObject(value) {
    try {
      return _.isObject((typeof value === 'string') ? JSON.parse(value) : value);
    } catch (e) {
      return false;
    }
  },
  isString: _.isString
};

// 自定义sanitizer
const customSanitizers = {
  toArray(value) {
    return (typeof value === 'string') ? JSON.parse(value) : value;
  },
  toIntArray(value) {
    value = (typeof value === 'string') ? JSON.parse(value) : value;
    return value.map(_.toInteger);
  },
  toStringArray(value) {
    value = (typeof value === 'string') ? JSON.parse(value) : value;
    return value.map(String);
  },
  toObject(value) {
    return (typeof value === 'string') ? JSON.parse(value) : value;
  }
};

// 自定义错误格式化
function errorFormatter(param, msg, value) {
  let namespace = param.split('.');
  let formParam = namespace.shift();

  while (namespace.length) {
    formParam += `[${namespace.shift()}]`;
  }

  return {
    param : formParam,
    msg   : msg,
    value : value
  };
}

module.exports = {
  customSanitizers,
  customValidators,
  errorFormatter
};
